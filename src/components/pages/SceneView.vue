<template>
    <div class="container">
        <div class="canvas-container" ref="container">
            <canvas id="render-canvas" ref="canvas"
                 :style="{ transform: 'translateX(' + transX + 'px) translateY(' + transY + 'px) scale(' + scale + ')' }"></canvas>
        </div>
        <Toolbar
            class="toolbar"
            @exit="exit"
            @toggle-grid="toggleGrid"
            @open-graphs="openGraphs"
            @reset-camera="resetCamera"
            @screenshot="screenshot"
            @toggle-theme="toggleTheme"/>
    </div>
</template>

<script setup lang="ts">
import Toolbar from '../input/Toolbar.vue'
import { nextTick,  onBeforeUnmount, onMounted, ref } from 'vue'
import { openPlot } from '../../plot/openPlot'

import { SceneController } from '../../scene/controller/controller'
import { createController } from '../../scene/controller/factory'

import { CameraControl } from '../../input/cameraControl'
import { PlayerControl } from '../../input/playerControl'
import { ScenePointerProxy } from '../../input/scenePointerProxy'

import { useObjects } from '../../stores/objects'
import { usePaths } from '../../stores/paths'
import { usePlayer } from '../../stores/player'
import { useProject } from '../../stores/project'
import { useResolution } from '../../stores/resolution'
import { useTheme } from '../../stores/theme'
import { MutationType } from 'pinia'
import { getCurrentTheme } from '../../scene/theme'

const objects = useObjects()
const paths = usePaths()
const player = usePlayer()
const project = useProject()
const resolution = useResolution()

const canvas = ref<HTMLCanvasElement|null>(null)
const container = ref<HTMLDivElement|null>(null)
var controller: SceneController

// Scene / Project
function buildScene() {
    //sanity check
    if (project.isEmpty || !canvas.value) {
        return
    }

    //build scene
    controller = createController(project, canvas.value!)
    //wire up animation with player control
    controller.registerOnFrameChanged((currentFrame: number) => {
        if (!player.isScrubbing && !controller!.isStatic ) {
            player.$patch({ currentFrame: currentFrame })
        }
    })
    controller.registerOnAnimationLoop(() => {
        //We need the animation in an endless loop, otherwise it apparently will be
        //destroyed after it finished. We can however pause the endless loop at the
        //end of each iteration
        if (!player.isLooping) {
            controller!.pause()
            player.togglePlaying() //pause
            nextTick(() => controller!.goToFrame(player.endFrame))
        }
    })

    //pick interaction
    controller.registerOnObjectPicked((objectId: number) => {
        if (objects.selectedObjectIdx == objectId) {
            objects.selectedObjectIdx = null
        }
        else {
            objects.selectedObjectIdx = objectId
        }
    })

    //start animation
    if (player.isPlaying) {
        controller.play(player.isLooping)
    }
}
//project.$subscribe((mutation, state) => buildScene())

// Player
player.$subscribe((mutation, state) => {
    //there has to be an animation to manipulate
    if (!controller) {
        return
    }

    //This function will be called often indirectly by the render loop
    //as it patches the current frame
    //to make this a bit faster, skip the rest if the patch object is just
    //the update for the current frame
    //Only exception is if the user is scrubbing the timeline
    if (mutation.type == MutationType.patchObject && mutation.payload.currentFrame) {
        return
    }

    //sync currentFrame while scrubbing or skipping
    controller.goToFrame(state.currentFrame)

    //Play Pause
    if (controller.isPlaying != state.isPlaying) {
        if (state.isPlaying) {
            //restart if necessary
            if (player.currentFrame == player.endFrame)
                controller.goToFrame(player.startFrame)
            controller.play(true)
        }
        else {
            controller.pause()
        }
    }
    //Speed ratio
    if (controller.speedRatio != state.speedRatio) {
        controller.speedRatio = state.speedRatio
    }
})

// Objects
objects.$subscribe((mutation, state) => {
    const id = objects.selectedObjectIdx
    if (id != null)
        controller?.select(id)
    //TODO: Bit too much to update all groups every time...
    objects.groups.forEach(g => controller?.setGroupEnabled(g.name, g.visible))
})

// Paths
paths.$subscribe((mutation, state) => {
    //TODO: Might be a bit much to update always all paths
    for (const path of paths.paths) {
        controller?.setPathEnabled(path.id, path.visible, path.color)
    }
})

// Resize
let fixed = resolution.fixed
const scale = ref(1.0)
const transX = ref(0)
const transY = ref(0)
function resizeCanvas() {
    const width = container.value!.clientWidth
    const height = container.value!.clientHeight

    if (resolution.fixed) {
        //fixed size
        controller?.resize(resolution.width, resolution.height)

        //scale canvas accordingly
        const hScale = width / resolution.width
        const vScale = height / resolution.height
        if (hScale < vScale) {
            scale.value = hScale
            transX.value = 0
            transY.value = -(resolution.height * hScale - height) / 2
        }
        else {
            scale.value = vScale
            transX.value = -(resolution.width * vScale - width) / 2
            transY.value = 0
        }
    }
    else {
        //fit to window
        controller?.resize(width, height)
        resolution.$patch({
            width: width,
            height: height
        })

        //no scale needed
        scale.value = 1.0
        transX.value = 0
        transY.value = 0
    }    
}
const resizer = new ResizeObserver(resizeCanvas)
resolution.$subscribe((mutation, state) => {
    if (state.fixed) {
        fixed = true
        resizeCanvas()
    }
    else if (fixed != state.fixed) { //Debounce
        fixed = false
        resizeCanvas()
    }
})

//UI
var cameraControl: CameraControl
var scenePointerProxy: ScenePointerProxy
var playerControl: PlayerControl

onMounted(() => {
    buildScene()
    resizeCanvas()
    resizer.observe(container.value!)

    //UI
    cameraControl = new CameraControl(controller, canvas.value!)
    scenePointerProxy = new ScenePointerProxy(canvas.value!, controller)
    playerControl = new PlayerControl(player)
})
onBeforeUnmount(() => {
    resizer.disconnect()
    controller.dispose()

    //UI
    cameraControl.dispose()
    scenePointerProxy.dispose()
    playerControl.dispose()
})

//Toolbar functions
function exit() {
    project.$reset()
}
function toggleGrid() {
    controller?.setGridEnabled(!controller.isGridEnabled)
}
function openGraphs() {
    openPlot(project.graphs)
}
function resetCamera() {
    controller?.resetCamera()
}
function screenshot() {
    controller?.screenshot()
}
const theme = useTheme()
function toggleTheme() {
    theme.toggleTheme()
    controller?.setTheme(getCurrentTheme())
}
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