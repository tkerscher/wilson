<template>
  <div class="cmap-root">
    <canvas
      ref="cmapCanvas"
      class="cmap-canvas"
      width="1"
      height="256"
    />
    <div class="sidebar">
      <DialInput
        class="slider"
        :model-value="maxValue"
        @update:model-value="updateMaxValue"
      />
      <div class="spacer" />
      <DialInput
        class="slider"
        :model-value="minValue"
        @update:model-value="updateMinValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DialInput from "../input/DialInput.vue";
import { onMounted, ref } from "vue";

import { renderColormap } from "../../util/color";
import { useProject } from "../../stores/project";
import { SceneCommander } from "../../scene/bus/commandBus";
const project = useProject();

const minValue = ref(1.0);
function updateMinValue(value: number) {
    if (value > maxValue.value)
        value = maxValue.value;
    minValue.value = value;
    SceneCommander.SetColormapMinScalar(value);
}
const maxValue = ref(0.0);
function updateMaxValue(value: number) {
    if (value < minValue.value)
        value = minValue.value;
    maxValue.value = value;
    SceneCommander.SetColormapMaxScalar(value);
}

const cmapCanvas = ref<HTMLCanvasElement|null>(null);
async function updateCanvas() {
    if (!cmapCanvas.value)
        return;

    //render color map
    const size = 1024;
    const dataArray = new Uint8ClampedArray(
        renderColormap(project.colormap, size).buffer);
    const imageData = new ImageData(dataArray, 1);
    const bitmap = await createImageBitmap(
        imageData, { imageOrientation: "flipY" });

    //update canvas
    const canvas = cmapCanvas.value;
    canvas.width = 1;
    canvas.height = imageData.height;
    //render colormap as bitmap
    const ctx = canvas.getContext("bitmaprenderer");
    if (!ctx)
        return;
    ctx.transferFromImageBitmap(bitmap);
}
project.$subscribe(updateCanvas);
onMounted(() => {
    const cmap = project.colormap;
    if (!cmap || cmap.stops.length <= 1) {
        //min max cant be equal, otherwise the shader crashes
        minValue.value = 0.0;
        maxValue.value = 1.0;
    }
    else {
        minValue.value = cmap.stops[0].value;
        maxValue.value = cmap.stops[cmap.stops.length - 1].value;
    }
    updateCanvas();
});
</script>

<style scoped>
.cmap-root {
    margin: 10px;
    display: flex;
    flex-direction: row;
}
.sidebar {
    display: flex;
    flex-direction: column;
    width: 100px;
}

.cmap-canvas {
    width: 45px;
    height: 500px;
    grid-column: 1/3;
    grid-row: 1;
    border: 3px solid black;
}

.spacer {
    flex: 1;
}
.slider {
    margin: 5px;
}
</style>
