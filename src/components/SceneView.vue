<template>
    <div class="container">
        <canvas id="render-canvas" ref="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { usePlayer } from '../stores/player'
import { useProject } from '../stores/project'
import { MutationType } from 'pinia'

import { SceneContainer } from '../scene/build';

const canvas = ref<HTMLCanvasElement|null>(null)
const player = usePlayer()
const project = useProject()

var scene: SceneContainer|null = null

function buildScene() {
    //sanity check
    if (project.isEmpty || !canvas.value) {
        return
    }

    //build scene
    scene = new SceneContainer(project.$state, canvas.value)
    //wire up animation with player state
    scene.engine.runRenderLoop(() => {
        if (!player.isScrubbing && !scene!.isStatic ) {
            player.$patch({ currentFrame: scene!.currentFrame })
        }
    })
    scene.animation.onAnimationGroupLoopObservable.add(() => {
        //We need the animation in an endless loop, otherwise it apparently will be
        //destroyed after it finished. We can however pause the endless loop at the
        //end of each iteration
        if (!player.isLooping) {
            scene!.pause()
            scene!.goToFrame(player.startFrame)
            player.togglePlaying() //pause
        }
    })

    //start animation
    if (player.isPlaying) {
        scene.play(player.isLooping)
    }
}
project.$subscribe((mutation, state) => buildScene())

player.$subscribe((mutation, state) => {
    //there has to be an animation to manipulate
    if (!scene) {
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
    scene.goToFrame(state.currentFrame)

    //Play Pause
    if (scene.isPlaying != state.isPlaying) {
        if (state.isPlaying) {
            scene.play()
        }
        else {
            scene.pause()
        }
    }
    //Speed ratio
    if (scene.speedRatio != state.speedRatio) {
        scene.speedRatio = state.speedRatio
    }
})

function resizeCanvas() {
    canvas.value!.width = canvas.value!.clientWidth
    canvas.value!.height = canvas.value!.clientHeight
    scene?.engine?.resize() //TODO: Do I need this?
}
const resizer = new ResizeObserver(resizeCanvas)

onMounted(() => {
    resizeCanvas()
    buildScene()
    resizer.observe(canvas.value!)
})
</script>

<style scoped>
#render-canvas {
    width: 100%;
    flex: 1;
    touch-action: none;
}
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
