<template>
  <div class="container">
    <div
      ref="container"
      class="canvas-container"
    >
      <canvas
        id="render-canvas"
        ref="canvas"
        :style="{ transform: 'translateX(' + transX + 'px) translateY(' + transY + 'px) scale(' + scale + ')' }"
      />
    </div>
    <Toolbar class="toolbar" />
  </div>
</template>

<script setup lang="ts">
import Toolbar from '../input/ToolbarInput.vue';
import { nextTick,  onBeforeUnmount, onMounted, ref } from 'vue';

import { SceneController } from '../../scene/controller/controller';
import { createController } from '../../scene/controller/factory';

import { CameraControl } from '../../input/cameraControl';
import { PlayerControl } from '../../input/playerControl';
import { ScenePointerProxy } from '../../input/scenePointerProxy';

import { useCatalogue } from '../../stores/catalogue';
import { usePlayer } from '../../stores/player';
import { useProject } from '../../stores/project';
import { useResolution } from '../../stores/resolution';
import { MutationType } from 'pinia';
import { getCurrentTheme } from '../../scene/theme';
import { ScreenRecorder } from '../../video/screenRecorder';
import { CatalogueControl } from '../../input/catalogueControl';
import { ControllerAdapter } from '../../scene/bus/controllerAdapter';
import { useStage } from '../../stores/stage';
import { useTheme } from '../../stores/theme';

const DefaultTitle = document.title;

const catalogue = useCatalogue();
const player = usePlayer();
const project = useProject();
const resolution = useResolution();
const stage = useStage();
const theme = useTheme();

const canvas = ref<HTMLCanvasElement|null>(null);
const container = ref<HTMLDivElement|null>(null);
var controller: SceneController;
var adapter: ControllerAdapter;

// Scene / Project
function buildScene() {
    //sanity check
    if (project.isEmpty || !canvas.value) {
        return;
    }

    //build scene
    controller.load(project);    

    //apply theme
    controller.setTheme(getCurrentTheme());

    //start animation
    if (player.isPlaying) {
        controller.play();
    }
    
    //apply stage
    stage.applyStage();

    //Change title
    if (project.meta?.name)
        document.title = project.meta.name + ' | ' + DefaultTitle;
}
project.$subscribe(() => buildScene());

// Player
let recorder: ScreenRecorder;
player.$subscribe((mutation, state) => {
    //there has to be an animation to manipulate
    if (!controller) {
        return;
    }

    //This function will be called often indirectly by the render loop
    //as it patches the current frame
    //to make this a bit faster, skip the rest if the patch object is just
    //the update for the current frame
    //Only exception is if the user is scrubbing the timeline
    if (mutation.type == MutationType.patchObject && mutation.payload.currentFrame) {
        return;
    }

    //sync currentFrame while scrubbing or skipping
    controller.goToFrame(state.currentFrame);

    //Play Pause
    if (controller.isPlaying != state.isPlaying) {
        if (state.isPlaying) {
            //restart if necessary
            if (player.currentFrame == player.endFrame)
                controller.goToFrame(player.startFrame);
            controller.play();
        }
        else {
            controller.pause();
        }
    }
    //Speed ratio
    if (controller.speedRatio != state.speedRatio) {
        controller.speedRatio = state.speedRatio;
    }

    //Recorder
    if (recorder.isRecording != state.isRecording) {
        if (state.isRecording) {
            recorder.start(player.recorderFps);
        }
        else {
            recorder.stop();
        }
    }
});

// Resize
let fixed = resolution.fixed;
const scale = ref(1.0);
const transX = ref(0);
const transY = ref(0);
function resizeCanvas() {
    if (!container.value)
        return;

    const width = container.value.clientWidth;
    const height = container.value.clientHeight;

    if (resolution.fixed) {
        //fixed size
        controller?.resize(resolution.width, resolution.height);

        //scale canvas accordingly
        const hScale = width / resolution.width;
        const vScale = height / resolution.height;
        if (hScale < vScale) {
            scale.value = hScale;
            transX.value = 0;
            transY.value = -(resolution.height * hScale - height) / 2;
        }
        else {
            scale.value = vScale;
            transX.value = -(resolution.width * vScale - width) / 2;
            transY.value = 0;
        }
    }
    else {
        //fit to window
        controller?.resize(width, height);
        resolution.$patch({
            width: width,
            height: height
        });

        //no scale needed
        scale.value = 1.0;
        transX.value = 0;
        transY.value = 0;
    }    
}
const resizer = new ResizeObserver(resizeCanvas);
resolution.$subscribe((mutation, state) => {
    if (state.fixed) {
        fixed = true;
        resizeCanvas();
    }
    else if (fixed != state.fixed) { //Debounce
        fixed = false;
        resizeCanvas();
    }
});

//theme
theme.$subscribe(() => {
    controller.setTheme(getCurrentTheme());
});

//UI
var catalogueControl: CatalogueControl;
var cameraControl: CameraControl;
var scenePointerProxy: ScenePointerProxy;
var playerControl: PlayerControl;

onMounted(async () => {
    if (!canvas.value)
        throw Error("Canvas not present!");
    if (!container.value)
        throw Error("Div container not present!");

    controller = await createController(canvas.value);
    adapter = new ControllerAdapter(controller);

    buildScene();
    resizeCanvas();
    resizer.observe(container.value);

    //wire up animation with player control
    controller.registerOnFrameChanged((currentFrame: number) => {
        if (!player.isScrubbing && !controller.isStatic ) {
            player.$patch({ currentFrame: currentFrame });
        }
    });
    controller.registerOnAnimationLoop(() => {
        //We need the animation in an endless loop, otherwise it apparently will be
        //destroyed after it finished. We can however pause the endless loop at the
        //end of each iteration
        if (!player.isLooping) {
            controller.pause();
            player.togglePlaying(); //pause
            nextTick(() => controller.goToFrame(player.endFrame));
        }
    });

    //UI
    catalogueControl = new CatalogueControl(catalogue);
    cameraControl = new CameraControl(controller, canvas.value);
    scenePointerProxy = new ScenePointerProxy(canvas.value, controller);
    playerControl = new PlayerControl(player);

    //Recorder
    let videoName = project.meta?.name ?? '';
    if (videoName.length == 0)
        videoName = "event";
    recorder = new ScreenRecorder(canvas.value, videoName + '.webm');
});
onBeforeUnmount(() => {
    resizer.disconnect();
    adapter.dispose();
    controller.dispose();

    //UI
    catalogueControl.dispose();
    cameraControl.dispose();
    scenePointerProxy.dispose();
    playerControl.dispose();

    //Reset title
    document.title = DefaultTitle;
});
</script>

<style scoped>
#render-canvas {
    position: absolute;
    left: 0;
    top: 0;
    transform-origin: 0% 0% 0px;
    touch-action: none;
    outline: none;
}
.canvas-container {
    flex: 1;
    touch-action: none;
}
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.toolbar {
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 10;
}
</style>
