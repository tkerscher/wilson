<template>
    <Download v-show="catalogue.isEmpty && url.length > 0" :url="url" @finished="catalogueLoaded"/>
    <ProjectView v-if="!project.isEmpty" />
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
import { useStage } from "./stores/stage"
const catalogue = useCatalogue()
const project = useProject()
const stage = useStage()
const theme = useTheme() //side effect only

function catalogueLoaded() {
    //only start downloading stage after catalogue is complete
    const params = new URLSearchParams(window.location.search)
    const path = params.get('stage')
    if (path) {
        stage.loadStage(decodeURIComponent(path))
    }
}

const url = ref('')
onBeforeMount(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('cat')) {
        url.value = decodeURIComponent(params.get('cat')!)
    }
})
</script>
