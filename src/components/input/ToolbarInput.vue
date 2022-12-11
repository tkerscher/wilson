<template>
  <div class="root">
    <div
      class="button"
      role="button"
      title="Exit"
      @mouseup="project.$reset()"
    >
      <div class="icon-large exit-icon toolbar-icon" />
    </div>
    <div
      class="button"
      role="button"
      title="Toggle Theme (T)"
      @mouseup="toggleTheme()"
    >
      <div
        :class="[
          'icon-large',
          theme.useDarkTheme ? 'moon-icon' : 'sun-icon',
          'toolbar-icon']"
      />
    </div>
    <div
      class="button"
      role="button"
      title="Toggle Grid (G)"
      @mouseup="toggleGrid"
    >
      <div class="icon-large grid-icon toolbar-icon" />
    </div>
    <div
      class="button"
      role="button"
      title="Open Graph Explorer (Shift+G)"
      @mouseup="openGraphs()"
    >
      <div class="icon-large chart-icon toolbar-icon" />
    </div>
    <div
      class="button"
      role="button"
      title="Reset Camera (R)"
      @mouseup="resetCamera()"
    >
      <div class="icon-large camera-rotate-icon toolbar-icon" />
    </div>
    <div
      class="button"
      role="button"
      title="Screenshot (P)"
      @mouseup="screenshot()"
    >
      <div class="icon-large camera-icon toolbar-icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";

import { KeyMap } from "../../input/keyMap";
import { openPlot } from "../../plot/openPlot";
import { SceneCommander } from "../../scene/bus/commandBus";

import { useProject } from "../../stores/project";
import { useTheme } from "../../stores/theme";
const project = useProject();
const theme = useTheme();

function openGraphs() {
    openPlot(project.graphs);
}
function resetCamera() {
    SceneCommander.ResetCamera();
}
function screenshot() {
    SceneCommander.Screenshot();
}
function toggleGrid() {
    SceneCommander.ToggleGrid();
}
function toggleTheme() {
    theme.toggleTheme();
}

const hotKeys = new KeyMap([
    ["KeyT", () => toggleTheme()],
    ["KeyG", () => toggleGrid],
    ["Shift+KeyG", () => openGraphs()],
    ["KeyP", () => screenshot()]
]);
function handleHotKey(e: KeyboardEvent) {
    if (!e.repeat)
        hotKeys.exec(e);
}

onMounted(() => document.addEventListener("keydown", handleHotKey));
onBeforeUnmount(() => document.removeEventListener("keydown", handleHotKey));
</script>

<style scoped>
.root {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--toolbox-background);
    border-radius: 10px;
}

.button {
    width: 50px;
    height: 50px;
    border-radius: 10px;
}
.button:hover {
    cursor: pointer;
    background-color: var(--primary4);
}
.button:hover > .icon {
    background-color: var(--highlight1);
}
.toolbar-icon {
    margin: 11px;
    background-color: #d3d3d3;
}
</style>
