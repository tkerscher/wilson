import { Config, Data, Layout } from "plotly.js-basic-dist-min";
import { Graph } from "../model/graph";

export function createPlotData(graphs: Graph[]): Data[] {
    return graphs.map(graph => ({
        x: graph.points.map(p => p.time),
        y: graph.points.map(p => p.value),
        mode: 'lines+markers',
        name: graph.name
    }))
}

export const PlotConfig: Partial<Config> = {
    modeBarButtonsToRemove: ['lasso2d', 'select2d'],
    responsive: true,
    scrollZoom: true,
    displayModeBar: true,
}

export const PlotLayot: Partial<Layout> = {
    autosize: true,
    dragmode: 'pan',
    font: {
        color: 'white'
    },
    margin: {
        t: 40
    },
    paper_bgcolor: '#3d3d3d',
    plot_bgcolor: '#3d3d3d',
    xaxis: {
        autorange: true,
        title: 'Time [ns]',
        gridcolor: '#d3d3d3',
        zerolinecolor: 'white',
        zerolinewidth: 2
    },
    yaxis: {
        autorange: true,
        gridcolor: '#d3d3d3',
        zerolinecolor: 'white',
        zerolinewidth: 2
    }
}
