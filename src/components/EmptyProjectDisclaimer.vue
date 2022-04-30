<template>
    <div class="container">
        <img class="banner" src="/p-one_blue_dark.svg" />
        <p class="disclaimer">
            Currently, there is nothing to show! <br />
            Select a file to watch it.
        </p>
        <label for="file-upload" class="p-button">
            <CloudUploadIcon class="icon" />Open File
        </label>
        <input id="file-upload" type="file" accept=".p1on" @change="onFileSelected"/>
    </div>
</template>

<script setup lang="ts">
import { CloudUploadIcon } from '@heroicons/vue/solid'
import { useProject } from '../stores/project'
const project = useProject()

function onFileSelected(e: Event) {
    const fileInput = e.target! as HTMLInputElement
    if (fileInput.files) {
        project.loadProject(fileInput.files[0])
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

    background-color: #2c2c2c;
}

.banner {
    height: 20%;
}

.disclaimer {
    font-size: x-large;
    font-weight: bolder;
    color: white;
}

input[type="file"] {
    display: none;
}
</style>
