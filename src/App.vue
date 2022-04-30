<template>
  <FileDropContainer :allowedFiles="/\.p1on/" @fileDrop="project.loadProject">
    <EmptyProjectDisclaimer v-if="project.isEmpty" />
    <Viewer v-else />
  </FileDropContainer>
</template>

<script setup lang="ts">
import EmptyProjectDisclaimer from './components/EmptyProjectDisclaimer.vue'
import FileDropContainer from './components/FileDropContainer.vue'
import Viewer from './components/Viewer.vue'
import { useProject } from './stores/project'
const project = useProject()
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
