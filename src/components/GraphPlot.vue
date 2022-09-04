<template>
<div class="root" ref="plotDiv">
</div>
</template>

<script setup lang="ts">
import { PlotConfig, PlotLayot, createPlotData } from '../plot/plot'
import { newPlot, react, relayout } from 'plotly.js-basic-dist'

import { onMounted, ref, nextTick } from "vue"
import { useGraphs } from '../stores/graphs';
const graphs = useGraphs()

let issueRedraw = false
function redraw() {
    issueRedraw = false
    react(plotDiv.value, createPlotData(graphs.visible), PlotLayot, PlotConfig)
}
const resizer = new ResizeObserver(() => relayout(plotDiv.value!, PlotLayot))

const plotDiv = ref<HTMLDivElement|null>(null)
onMounted(() => {
    //Start with empty 
    newPlot(plotDiv.value!, [], PlotLayot, PlotConfig);

    //watch for changes in graphs
    graphs.$subscribe(() => {
        if (!issueRedraw) {
            issueRedraw = true
            nextTick(redraw)
        }
    })
    //watch for size changes
    resizer.observe(plotDiv.value!)
})
</script>

<style scoped>
.root {
    width: 100%;
    height: 100%;
}
</style>
