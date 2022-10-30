<template>
    <Download v-if="url.length > 0" :url="url" @finished="url = ''" />
    <ProjectView v-else-if="!project.isEmpty" />
    <CatalogueView v-else-if="!catalogue.isEmpty" />
    <EmptyProjectDisclaimer v-else />
</template>

<script setup lang="ts">
import "./style.css"

import CatalogueView from "./components/pages/CatalogueView.vue"
import Download from './components/pages/Download.vue'
import EmptyProjectDisclaimer from './components/pages/EmptyProjectDisclaimer.vue'
import ProjectView from './components/pages/ProjectView.vue'

import { onBeforeMount, ref } from "vue"
import { useProject } from './stores/project'
import { useTheme } from "./stores/theme"
import { useCatalogue } from "./stores/catalogue"
const catalogue = useCatalogue()
const project = useProject()
const theme = useTheme() //side effect only

const url = ref('')
onBeforeMount(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('cat')) {
        url.value = decodeURIComponent(params.get('cat')!)
    }
})
</script>
