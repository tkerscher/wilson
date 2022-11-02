<template>
  <div
    ref="plotDiv"
    class="root"
  />
</template>

<script setup lang="ts">
import { PlotConfig, createPlotData, createPlotLayout } from '../../plot/plot';
import { newPlot, react, relayout } from "plotly.js-basic-dist";

import { onMounted, ref, nextTick } from "vue";
import { useGraphs } from '../../stores/graphs';
import { useTheme } from '../../stores/theme';
const graphs = useGraphs();
const theme = useTheme();

let plotLayout = createPlotLayout(theme.useDarkTheme);
theme.$subscribe((mutation, state) => {
    plotLayout = createPlotLayout(state.useDarkTheme);
    if (plotDiv.value)
        relayout(plotDiv.value, plotLayout);
});

let issueRedraw = false;
function redraw() {
    if (!plotDiv.value)
        return;

    issueRedraw = false;
    react(plotDiv.value, createPlotData(graphs.visible), plotLayout, PlotConfig);
}
const resizer = new ResizeObserver(() => {
    if (!plotDiv.value)
        return;

    relayout(plotDiv.value, plotLayout);
});

const plotDiv = ref<HTMLDivElement|null>(null);
onMounted(() => {
    if (!plotDiv.value)
        throw Error("Plot div not present!");

    //Start with empty 
    newPlot(plotDiv.value, [], plotLayout, PlotConfig);

    //watch for changes in graphs
    graphs.$subscribe(() => {
        if (!issueRedraw) {
            issueRedraw = true;
            nextTick(redraw);
        }
    });
    //watch for size changes
    resizer.observe(plotDiv.value);
});
</script>

<style scoped>
.root {
    width: 100%;
    height: 100%;
}
</style>
