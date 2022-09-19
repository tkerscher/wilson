<template>
    <Download v-if="url.length > 0" :url="url" @finished="url = ''" />
    <FileDropContainer v-else :allowedFiles="/\.p1on/" @fileDrop="openFile">
        <EmptyProjectDisclaimer v-if="project.isEmpty" />
        <ProjectView v-else />
    </FileDropContainer>
</template>

<script setup lang="ts">
import "./style.css"

import Download from './components/Download.vue'
import EmptyProjectDisclaimer from './components/EmptyProjectDisclaimer.vue'
import FileDropContainer from './components/FileDropContainer.vue'
import ProjectView from './components/ProjectView.vue'

import { onBeforeMount, ref } from "vue"
import { useProject } from './stores/project'
import { useTheme } from "./stores/theme"
const project = useProject()
const theme = useTheme() //side effect only

const url = ref('')
onBeforeMount(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('event')) {
        url.value = decodeURIComponent(params.get('event')!)
    }
})

async function openFile(file: File) {
    project.loadProject(await file.arrayBuffer())
}
</script>
