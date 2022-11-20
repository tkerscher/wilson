<template>
  <div
    ref="plotDiv"
    class="root"
  />
</template>

<script setup lang="ts">
import { createConfig, createPlotData, createPlotLayout } from '../../plot/plot';
import { newPlot, react, relayout } from "plotly.js-basic-dist";

import { onMounted, ref, nextTick, onBeforeUnmount } from "vue";
import { useGraphs } from '../../stores/graphs';
import { useTheme } from '../../stores/theme';
const graphs = useGraphs();
const theme = useTheme();

const config = createConfig(theme.toggleTheme, handleScale);
function handleThemeHotkey(e: KeyboardEvent) {
    if (e.altKey || e.ctrlKey || e.shiftKey)
        return;    
    if (e.repeat)
        return;
    if (e.code == 'KeyT')
        theme.toggleTheme();
}

function handleScale() {
    plotLayout = createPlotLayout(theme.useDarkTheme);
    if (plotDiv.value)
        relayout(plotDiv.value, plotLayout);
}

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
    react(plotDiv.value, createPlotData(graphs.visible), plotLayout, config);
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
    newPlot(plotDiv.value, [], plotLayout, config);

    //watch for changes in graphs
    graphs.$subscribe(() => {
        if (!issueRedraw) {
            issueRedraw = true;
            nextTick(redraw);
        }
    });
    //watch for size changes
    resizer.observe(plotDiv.value);

    //register theme toggle hot key
    document.addEventListener('keydown', handleThemeHotkey);
});
onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleThemeHotkey);
});
</script>

<style scoped>
.root {
    width: 100%;
    height: 100%;
}
</style>
