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
         title="Toggle Theme"
         @mouseup="emits('toggleTheme')">
        <div :class="[
            'icon-large',
            theme.useDarkTheme ? 'moon-icon' : 'sun-icon',
             'toolbar-icon']"></div>   
    </div>
    <div class="button"
         role="button"
         title="Toggle Grid"
         @mouseup="emits('toggleGrid')">
        <div class="icon-large grid-icon toolbar-icon"></div>     
    </div>
    <div class="button"
         role="button"
         title="Open Graph Explorer"
         @mouseup="emits('openGraphs')">
        <div class="icon-large chart-icon toolbar-icon"></div>     
    </div>
    <div class="button"
         role="button"
         title="Reset Camera"
         @mouseup="emits('resetCamera')">
        <div class="icon-large camera-rotate-icon toolbar-icon"></div>     
    </div>
    <div class="button"
         role="button"
         title="Screenshot"
         @mouseup="emits('screenshot')">
        <div class="icon-large camera-icon toolbar-icon"></div>     
    </div>
</div>
</template>

<script setup lang="ts">
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
