<template>
  <FileDropContainer :allowedFiles="/\.p1on/" @fileDrop="project.loadProject">
    <WIPDisclaimer/>
  </FileDropContainer>
</template>

<script setup lang="ts">
import FileDropContainer from './components/FileDropContainer.vue'
import WIPDisclaimer from './components/WIPDisclaimer.vue'
import { useProject } from './stores/project'
const project = useProject()

function foo() {
  alert('foo')
}
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
