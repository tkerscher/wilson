<template>
<div class="root">
    <div class="button"
         role="button"
         title="Exit"
         @mouseup="emits('exit')">
        <div class="icon-large exit-icon toolbar-icon"></div>
    </div>
    <div class="button"
         role="button"
         title="Toggle Theme (T)"
         @mouseup="emits('toggleTheme')">
        <div :class="[
            'icon-large',
            theme.useDarkTheme ? 'moon-icon' : 'sun-icon',
             'toolbar-icon']"></div>   
    </div>
    <div class="button"
         role="button"
         title="Toggle Grid (G)"
         @mouseup="emits('toggleGrid')">
        <div class="icon-large grid-icon toolbar-icon"></div>     
    </div>
    <div class="button"
         role="button"
         title="Open Graph Explorer (Shift+G)"
         @mouseup="emits('openGraphs')">
        <div class="icon-large chart-icon toolbar-icon"></div>     
    </div>
    <div class="button"
         role="button"
         title="Reset Camera (R)"
         @mouseup="emits('resetCamera')">
        <div class="icon-large camera-rotate-icon toolbar-icon"></div>     
    </div>
    <div class="button"
         role="button"
         title="Screenshot (P)"
         @mouseup="emits('screenshot')">
        <div class="icon-large camera-icon toolbar-icon"></div>     
    </div>
</div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import { KeyMap } from '../../input/keyMap';
import { useTheme } from '../../stores/theme';
const theme = useTheme()

const emits = defineEmits<{
    (e: 'exit'): void,
    (e: 'resetCamera'): void,
    (e: 'screenshot'): void
    (e: 'toggleGrid'): void,
    (e: 'toggleTheme'): void,
    (e: 'openGraphs'): void
}>()

const hotKeys = new KeyMap([
    ["KeyT", () => emits('toggleTheme')],
    ["KeyG", () => emits('toggleGrid')],
    ["Shift+KeyG", () => emits('openGraphs')],
    ["KeyP", () => emits('screenshot')]
])
function handleHotKey(e: KeyboardEvent) {
    if (!e.repeat)
        hotKeys.exec(e)
}

onMounted(() => document.addEventListener('keydown', handleHotKey))
onBeforeUnmount(() => document.removeEventListener('keydown', handleHotKey))
</script>

<style scoped>
.root {
    width: 50px;
    display: flex;
    flex-direction: column;
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
