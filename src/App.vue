<template>
  <FileDropContainer :allowedFiles="/\.p1on/" @fileDrop="project.loadProject">
    <EmptyProjectDisclaimer v-if="project.isEmpty" />
    <!-- <Viewer v-else /> -->
    <ProjectView v-else />
  </FileDropContainer>
</template>

<script setup lang="ts">
import "./style.css"
import EmptyProjectDisclaimer from './components/EmptyProjectDisclaimer.vue'
import FileDropContainer from './components/FileDropContainer.vue'
import Viewer from './components/Viewer.vue'
import ProjectView from './components/ProjectView.vue'
import { useProject } from './stores/project'
const project = useProject()
</script>
