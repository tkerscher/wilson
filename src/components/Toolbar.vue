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
         title="Toggle Grid"
         @mouseup="emits('toggleGrid')">
        <div class="icon grid-icon"></div>     
    </div>
    <div class="button"
         role="button"
         title="Reset Camera"
         @mouseup="emits('resetCamera')">
        <div class="icon reset-camera-icon"></div>     
    </div>
    <div class="button"
         role="button"
         title="Export"
         @mouseup="emits('export')">
        <div class="icon export-icon"></div>     
    </div>
</div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
    (e: 'exit'): void,
    (e: 'toggleGrid'): void,
    (e: 'resetCamera'): void,
    (e: 'export'): void
}>()
</script>

<style scoped>
.root {
    width: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #1a1a1ad5;
    border-radius: 10px;
}

.button {
    width: 50px;
    height: 50px;
    border-radius: 10px;
}
.button:hover {
    cursor: pointer;
    background-color: #2c2c2c;
}
.button:hover > .icon {
    background-color: #3497ff;
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
.exit-icon {
    mask-image: url(../assets/icons/exit.svg);
    -webkit-mask-image: url(../assets/icons/exit.svg);
}
.export-icon {
    mask-image: url(../assets/icons/file-arrow-down.svg);
    -webkit-mask-image: url(../assets/icons/file-arrow-down.svg);
}
.grid-icon {
    mask-image: url(../assets/icons/border-all.svg);
    -webkit-mask-image: url(../assets/icons/border-all.svg);
}
.reset-camera-icon {
    mask-image: url(../assets/icons/camera-rotate.svg);
    -webkit-mask-image: url(../assets/icons/camera-rotate.svg);
}
</style>
