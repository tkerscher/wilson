import { Config, Data, Layout } from "plotly.js-basic-dist";
import { Graph } from "../model/graph";
import { Interpolation } from "../model/interpolation";

function getShapeFromInterpolation(int: Interpolation): string {
    switch (int) {
        case Interpolation.AHEAD:
            return 'vh';
        case Interpolation.HOLD:
            return 'hv';
        case Interpolation.LINEAR:
        case Interpolation.UNRECOGNIZED:
        default:
            return 'linear';
    }
}

export function createPlotData(graphs: Graph[]): Data[] {
    return graphs.map(graph => ({
        x: graph.points.map(p => p.time),
        y: graph.points.map(p => p.value),
        mode: 'lines+markers',
        name: graph.name,
        line: {
            shape: getShapeFromInterpolation(graph.interpolation)
        }
    }));
}

export const PlotConfig: Partial<Config> = {
    modeBarButtonsToRemove: ['lasso2d', 'select2d'],
    responsive: true,
    scrollZoom: true,
    displayModeBar: true,
};

export function createPlotLayout(useDarkTheme: boolean): Partial<Layout> {
    return {
        autosize: true,
        dragmode: 'pan',
        font: {
            color: useDarkTheme ? 'white' : 'black'
        },
        margin: {
            t: 40
        },
        paper_bgcolor: useDarkTheme ? '#3d3d3d' : 'white',
        plot_bgcolor: useDarkTheme ? '#3d3d3d' : 'white',
        xaxis: {
            autorange: true,
            title: 'Time [ns]',
            gridcolor: useDarkTheme ? '#d3d3d3' : 'black',
            zerolinecolor: useDarkTheme ? 'white' : 'black',
            zerolinewidth: 2
        },
        yaxis: {
            autorange: true,
            gridcolor: useDarkTheme ? '#d3d3d3' : 'black',
            zerolinecolor: useDarkTheme ? 'white' : 'black',
            zerolinewidth: 2
        }
    };
}
