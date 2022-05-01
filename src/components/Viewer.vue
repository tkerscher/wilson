<template>
    <div class="container">
        <canvas id="render-canvas" ref="canvas"></canvas>
        <div class="description-box" v-if="selectedMeta != null">
            <p class="name">{{selectedMeta.name}}</p>
            <p class="description">{{selectedMeta.description}}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { AbstractMesh, IPointerEvent, PickingInfo, PointerEventTypes } from '@babylonjs/core';
import { onMounted, ref } from 'vue'
import { createScene, SceneContainer } from '../sceneBuilder'
import { useProject, ObjectMeta } from '../stores/project'
const canvas = ref<HTMLCanvasElement|null>(null)
const project = useProject()
var scene: SceneContainer|null = null
var selectedMesh: AbstractMesh|null = null
var selectedMeta = ref<ObjectMeta|null>(null)

function loadProject() {
    if (project.isEmpty || !canvas.value) {
        return
    }

    //Reset state
    selectedMesh = null

    //Build scene
    scene = createScene(project.$state, canvas.value)
    scene.scene.onPointerUp = onSelect
    //Run animation/render
    scene.animation.play(true)
    scene.engine.runRenderLoop(() => {
        scene!.scene.render()
    })
}
project.$subscribe((mutation, state) => loadProject())

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
    height: 100%;
    touch-action: none;
}
.container {
    width: 100%;
    height: 100%;
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
