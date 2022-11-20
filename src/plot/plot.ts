import { Config, Data, Icon, Layout } from "plotly.js-basic-dist";
import { Graph } from "../model/graph";
import { Interpolation } from "../model/interpolation";

//Icons by FontAwesome
//Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.

const ThemeIcon: Icon = {
    width: 512,
    height: 512,
    path: 'M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zm64 0c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256z'
};

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

export function createConfig(themeCallback: () => void): Partial<Config> {
    return {
        modeBarButtonsToAdd: [
            {
                name: 'theme',
                title: 'Toggle Theme',
                icon: ThemeIcon,
                click: themeCallback
            }
        ],
        modeBarButtonsToRemove: ['lasso2d', 'select2d'],
        responsive: true,
        scrollZoom: true,
        displayModeBar: true,
    };
}

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
