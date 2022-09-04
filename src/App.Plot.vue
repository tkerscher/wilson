<template>
<div class="main">
    <GraphPlot />
    <ResizableContainer
        grip-position="left"
        store-key="plot-sidebar-width"
        default-size="300px"
        class="sidebar"
    >
        <div class="sidebar-container">
            <GraphExplorer />
        </div>
    </ResizableContainer>
</div>
</template>

<script setup lang="ts">
import GraphExplorer from './components/GraphExplorer.vue'
import GraphPlot from './components/GraphPlot.vue'
import ResizableContainer from './components/ResizableContainer.vue'

import { onMounted } from 'vue'
import { extractGraphs } from './plot/openPlot'
import { GraphHandle, useGraphs } from './stores/graphs'
const graphs = useGraphs()

onMounted(() => {
    extractGraphs()
        .then(graphs => graphs.map(g => g as GraphHandle))
        .then(gs => graphs.$patch({ graphs: gs}))
})
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

<style scoped>
.main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}
.sidebar {
    min-width: 200px;
}
.sidebar-container {
    height: 100%;
    width: 100%;
    background-color: #1a1a1a;
}
</style>
