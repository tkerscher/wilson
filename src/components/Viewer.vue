<template>
    <div class="container" ref="container" @fullscreenchange="fullscreenChanged">
        <canvas id="render-canvas" ref="canvas"></canvas>
        <div class="description-box" v-if="selectedMeta != null">
            <p class="name">{{selectedMeta.name}}</p>
            <p class="description">{{selectedMeta.description}}</p>
        </div>
        <PlayerControl class="controller"
                       @scrubbing-start="isScrubbing = true"
                       @scrubbing-end="isScrubbing = false"
                       @toggle-fullscreen="toggleFullscreen" />
    </div>
</template>

<script setup lang="ts">
import PlayerControl from './PlayerControl.vue'
import { onMounted, ref } from 'vue'

import { AbstractMesh, IPointerEvent, PickingInfo, PointerEventTypes } from '@babylonjs/core';
import { createScene, SceneContainer } from '../sceneBuilder'

import { useProject, ObjectMeta } from '../stores/project'
import { usePlayer } from '../stores/player';
import { MutationType } from 'pinia';

const canvas = ref<HTMLCanvasElement|null>(null)
const container = ref<HTMLDivElement|null>(null)
const project = useProject()
const player = usePlayer()

var scene: SceneContainer|null = null
var selectedMesh: AbstractMesh|null = null
var selectedMeta = ref<ObjectMeta|null>(null)
const isScrubbing = ref(false)

/**************************** Project Loading *********************************/

function loadProject() {
    if (project.isEmpty || !canvas.value) {
        return
    }

    //Reset state
    selectedMesh = null
    player.$reset()

    //load meta into player
    player.$patch({
        startFrame: project.meta?.startTime ?? 0.0,
        endFrame: project.meta?.endTime ?? 0.0,
        isPlaying: true,
        isLooping: true
    })

    //Build scene
    scene = createScene(project.$state, canvas.value)
    scene.scene.onPointerUp = onSelect
    //Run animation/render
    scene.animation.play(true)
    scene.engine.runRenderLoop(renderLoop)
    scene.animation.onAnimationGroupLoopObservable.add(onLoop)
}
project.$subscribe((mutation, state) => loadProject())
function renderLoop() {
    scene!.scene.render()
    if (!isScrubbing.value && scene!.animation.animatables.length > 0) {
        player.$patch({ currentFrame: scene!.animation.animatables[0].masterFrame})
    }
}

function onLoop() {
    //We need the animation in an endless loop, otherwise it apparently will be
    //destroyed after it finished. We can however pause the endless loop at the
    //end of each iteration
    if (!player.isLooping) {
        scene!.animation.pause()
        scene!.animation.goToFrame(player.startFrame)
        player.togglePlaying() //pause
    }
}

/**************************** Player Control Wiring ***************************/

player.$subscribe((mutation, state) => {
    //there has to be an animation to manipulate
    if (!scene?.animation) {
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
    scene.animation.goToFrame(state.currentFrame)

    //Play Pause
    if (scene.animation.isPlaying != state.isPlaying) {
        if (state.isPlaying) {
            scene.animation.play()
        }
        else {
            scene.animation.pause()
        }
    }
    //Speed ratio
    if (scene.animation.speedRatio != state.speedRatio) {
        scene.animation.speedRatio = state.speedRatio
    }
})

function fullscreenChanged() {
    if (document.fullscreenElement) {
        player.$patch({ isFullscreen: true })
    }
    else {
        player.$patch({ isFullscreen: false })
    }
}
function toggleFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen()
    }
    else {
        container.value!.requestFullscreen()
    }
}

/***************************** Canvas Interaction *****************************/

function onSelect(evt: IPointerEvent, pickInfo: PickingInfo|null, type: PointerEventTypes) {
    if (!pickInfo || pickInfo.pickedMesh == selectedMesh) {
        return
    }

    //unselect previous
    if (selectedMesh) {
        selectedMesh.renderOutline = false
        selectedMeta.value = null
    }

    if (pickInfo.hit) {
        selectedMesh = pickInfo.pickedMesh!
        selectedMesh.renderOutline = true
        selectedMeta.value = project.getMetaById(selectedMesh.uniqueId)
    }
    else {
        selectedMesh = null
    }
}

function resizeCanvas() {
    canvas.value!.width = canvas.value!.clientWidth
    canvas.value!.height = canvas.value!.clientHeight
    scene?.engine?.resize() //TODO: Do I need this?
}
const resizer = new ResizeObserver(resizeCanvas)

onMounted(() => {
    resizeCanvas()
    loadProject()
    resizer.observe(canvas.value!)
})
</script>

<style>
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

.controller {
    position: fixed;
    bottom: 0;
}

.description-box {
    width: 250px;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 3;

    color: white;
    text-align: left;

    background-color: #2c2c2c;
    border-radius: 10px;
    border: 1px solid black;
    padding: 0px 10px;
}

.name {
    font-weight: bold;
    font-size: large;
    text-align: center;
}
</style>
