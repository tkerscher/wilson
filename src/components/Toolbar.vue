<template>
<div class="root">
    <div class="button"
         role="button"
         title="Exit"
         @mouseup="emits('exit')">
        <div class="icon exit-icon"></div>
    </div>
    <div class="button"
         role="button"
         title="Toggle Theme"
         @mouseup="emits('toggleTheme')">
        <div :class="['icon', theme.useDarkTheme ? 'moon-icon' : 'sun-icon']"></div>   
    </div>
    <div class="button"
         role="button"
         title="Toggle Grid"
         @mouseup="emits('toggleGrid')">
        <div class="icon grid-icon"></div>     
    </div>
    <div class="button"
         role="button"
         title="Open Graph Explorer"
         @mouseup="emits('openGraphs')">
        <div class="icon graph-icon"></div>     
    </div>
    <div class="button"
         role="button"
         title="Reset Camera"
         @mouseup="emits('resetCamera')">
        <div class="icon reset-camera-icon"></div>     
    </div>
    <div class="button"
         role="button"
         title="Screenshot"
         @mouseup="emits('screenshot')">
        <div class="icon camera-icon"></div>     
    </div>
</div>
</template>

<script setup lang="ts">
import { useTheme } from '../stores/theme';
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
.icon {
    width: 28px;
    height: 28px;
    margin: 11px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    background-color: #d3d3d3;
}
.camera-icon {
    mask-image: url(../assets/icons/camera.svg);
    -webkit-mask-image: url(../assets/icons/camera.svg);
}
.exit-icon {
    mask-image: url(../assets/icons/exit.svg);
    -webkit-mask-image: url(../assets/icons/exit.svg);
}
.graph-icon {
    mask-image: url(../assets/icons/chart.svg);
    -webkit-mask-image: url(../assets/icons/chart.svg);
}
.grid-icon {
    mask-image: url(../assets/icons/border-all.svg);
    -webkit-mask-image: url(../assets/icons/border-all.svg);
}
.reset-camera-icon {
    mask-image: url(../assets/icons/camera-rotate.svg);
    -webkit-mask-image: url(../assets/icons/camera-rotate.svg);
}

.moon-icon {
    mask-image: url(../assets/icons/moon.svg);
    -webkit-mask-image: url(../assets/icons/moon.svg);
}

.sun-icon {
    mask-image: url(../assets/icons/sun.svg);
    -webkit-mask-image: url(../assets/icons/sun.svg);
}
</style>
