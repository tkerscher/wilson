<template>
    <canvas id="render-canvas" ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { ArcRotateCamera, Color3, Engine, HemisphericLight, Material, MeshBuilder, Scene, SceneLoader, StandardMaterial, Vector3 } from '@babylonjs/core';
import { onMounted, ref } from 'vue'
import { Color } from '../model/color';
import { Project } from '../model/project';
import { createScene, SceneContainer } from '../sceneBuilder'
import { useProject } from '../stores/project'
const canvas = ref<HTMLCanvasElement|null>(null)
const project = useProject()
var scene: SceneContainer|null = null
var engine: Engine|null = null

function loadProject(project: Project) {
    if (canvas.value) {
        console.log(project)
        scene = createScene(project, canvas.value)
        //console.log(scene)
        scene.engine.runRenderLoop(() => {
            scene!.scene.render()
        })
        scene.animation.play()
    }
}
project.$subscribe((mutation, state) => loadProject(state))

function resizeCanvas() {
    canvas.value!.width = canvas.value!.clientWidth
    canvas.value!.height = canvas.value!.clientHeight
    engine?.resize()
}
const resizer = new ResizeObserver(resizeCanvas)

onMounted(() => {
    resizeCanvas()
    resizer.observe(canvas.value!)
})
</script>
<style>
#render-canvas {
    width: 100%;
    height: 100%;
    touch-action: none;
}
</style>
