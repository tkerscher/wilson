<template>
    <div class="container">
        <canvas id="render-canvas" ref="canvas"></canvas>
        <Toolbar
            class="toolbar"
            @exit="exit"
            @toggle-grid="toggleGrid"
            @reset-camera="resetCamera"
            @screenshot="screenshot" />
    </div>
</template>

<script setup lang="ts">
import Toolbar from './Toolbar.vue'
import { onMounted, ref } from 'vue'

import { useObjects } from '../stores/objects'
import { usePaths } from '../stores/paths'
import { usePlayer } from '../stores/player'
import { useProject } from '../stores/project'
import { MutationType } from 'pinia'

import { SceneContainer } from '../scene/build'
import { PathVisualizer } from '../scene/paths'
import { PointerEventTypes } from '@babylonjs/core'

// Scene / Project

const canvas = ref<HTMLCanvasElement|null>(null)
var scene: SceneContainer|null = null
var pathVis: PathVisualizer|null = null

const project = useProject()
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

    //create path visualizer
    pathVis = new PathVisualizer(scene.scene, project)

    //pointer interaction
    scene.scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.type == PointerEventTypes.POINTERUP &&
            pointerInfo.pickInfo?.hit && pointerInfo.pickInfo.pickedMesh)
        {
            const id = pointerInfo.pickInfo.pickedMesh.uniqueId;
            if (objects.selectedObjectIdx == id) {
                objects.selectedObjectIdx = null
            }
            else {
                objects.selectedObjectIdx = id
            }
        }
    })

    //start animation
    if (player.isPlaying) {
        scene.play(player.isLooping)
    }
}
project.$subscribe((mutation, state) => buildScene())

// Player

const player = usePlayer()
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

// Objects

const objects = useObjects()
objects.$subscribe((mutation, state) => {
    scene?.select(objects.selectedObjectIdx)
    //TODO: Bit too much to update all groups every time...
    objects.groups.forEach(g => scene?.setGroupEnabled(g.name, g.visible))
})

// Paths

const paths = usePaths()
paths.$subscribe((mutation, state) => {
    if (!pathVis)
        return

    //TODO: Might be a bit much to update always all paths
    for (const path of paths.paths) {
        pathVis.setPath(path.id, path.visible, path.color)
    }
})

// Resize

function resizeCanvas() {
    if (!canvas.value)
        return
    canvas.value.width = canvas.value.clientWidth
    canvas.value.height = canvas.value.clientHeight
    scene?.engine!.resize(true) //Force resize event
}
const resizer = new ResizeObserver(resizeCanvas)

onMounted(() => {
    resizeCanvas()
    buildScene()
    resizer.observe(canvas.value!)
})

//Toolbar functions
function exit() {
    project.$reset()
}
function toggleGrid() {
    scene?.grid.setEnabled(!scene.grid.isEnabled())
}
function resetCamera() {
    scene?.resetCamera()
}
function screenshot() {
    scene?.screenshot()
}
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
.toolbar {
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 10;
}
</style>
