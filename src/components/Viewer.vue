<template>
    <canvas id="render-canvas" ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createScene, SceneContainer } from '../sceneBuilder'
import { useProject } from '../stores/project'
const canvas = ref<HTMLCanvasElement|null>(null)
const project = useProject()
var scene: SceneContainer|null = null

function loadProject() {
    if (project.isEmpty) {
        return
    }

    if (canvas.value) {
        console.log(project.$state)
        scene = createScene(project.$state, canvas.value)
        //console.log(scene)
        scene.engine.runRenderLoop(() => {
            scene!.scene.render()
        })
        scene.animation.play(true)
    }
}
project.$subscribe((mutation, state) => loadProject())

function resizeCanvas() {
    canvas.value!.width = canvas.value!.clientWidth
    canvas.value!.height = canvas.value!.clientHeight
    scene?.engine?.resize()
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
</style>
