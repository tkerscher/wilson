<template>
    <div class="container">
        <img class="banner" src="/p-one_blue_dark.svg" />
        <p class="disclaimer">
            Currently, there is nothing to show! <br />
            Select a file to watch it.
        </p>
        <label for="file-upload" class="p-button">
            <div class="icon icon-small upload-icon"></div>Open File
        </label>
        <input id="file-upload" type="file" accept=".p1on" @change="onFileSelected"/>
    </div>
</template>

<script setup lang="ts">
import { useProject } from '../stores/project'
const project = useProject()

async function onFileSelected(e: Event) {
    const fileInput = e.target! as HTMLInputElement
    if (fileInput.files) {
        project.loadProject(await fileInput.files[0].arrayBuffer())
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: var(--background);
}

.icon {
    margin: 2px 5px 2px 2px;
    background-color: #ffffff;
}

.banner {
    height: 20%;
}

.disclaimer {
    font-size: x-large;
    font-weight: bolder;
}

input[type="file"] {
    display: none;
}
</style>
