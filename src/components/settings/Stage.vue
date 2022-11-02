<template>
<div class="container">
    <input type="file" id="dialog" accept=".glb" @change="openFile" />
    <label for="dialog" class="p-button">
        <div class="icon icon-small upload-icon"></div>Open Stage
    </label>
    <div v-if="stage.error" class="message">
        <div class="icon icon-small triangle-exclamation-icon"></div>
        {{stage.error}}
    </div>
    <div v-else-if="stage.isDownloading" class="message">
        <div class="icon icon-small spinner-icon"></div>
        Downloading stage file ({{(stage.progress * 100).toFixed()}}%)...
    </div>
</div>
</template>

<script setup lang="ts">
import { useStage } from '../../stores/stage'
const stage = useStage()

async function openFile(e: Event) {
    const fileInput = e.target! as HTMLInputElement
    if (fileInput.files) {
        stage.setStage(fileInput.files[0])
    }
}
</script>

<style scoped>
.container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
.message {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.icon {
    background-color: var(--primary7);
    margin-right: 5px;
}

input[type="file"] {
    display: none;
}
</style>
