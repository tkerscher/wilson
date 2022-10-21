<template>
    <Download v-if="url.length > 0" :url="url" @finished="url = ''" />
    <EmptyProjectDisclaimer v-else-if="project.isEmpty" />
    <ProjectView v-else />
</template>

<script setup lang="ts">
import "./style.css"

import Download from './components/pages/Download.vue'
import EmptyProjectDisclaimer from './components/pages/EmptyProjectDisclaimer.vue'
import ProjectView from './components/pages/ProjectView.vue'

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
