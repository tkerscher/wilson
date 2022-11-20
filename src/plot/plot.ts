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
const RulerIcon: Icon = {
    width: 512,
    height: 512,
    path: 'M.2 468.9C2.7 493.1 23.1 512 48 512l96 0 320 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48l-48 0 0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80-64 0 0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80-64 0 0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0 0-64-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0 0-64-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0 0-48c0-26.5-21.5-48-48-48L48 0C21.5 0 0 21.5 0 48L0 368l0 96c0 1.7 .1 3.3 .2 4.9z'
};

let linearScale = (localStorage.getItem('scale') ?? 'linear') == 'linear';

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

export function createConfig(themeCallback: () => void, scaleCallback: () => void): Partial<Config> {
    return {
        modeBarButtonsToAdd: [
            {
                name: 'theme',
                title: 'Toggle Theme',
                icon: ThemeIcon,
                click: themeCallback
            },
            {
                name: 'scale',
                title: 'Change Scale (Lin/Log)',
                icon: RulerIcon,
                click: () => {
                    linearScale = !linearScale;
                    localStorage.setItem('scale', linearScale ? 'linear' : 'log');
                    scaleCallback();
                }
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
            gridcolor: useDarkTheme ? '#d3d3d3' : 'black',
            title: 'Time [ns]',
            type: linearScale ? 'linear' : 'log',
            zerolinecolor: useDarkTheme ? 'white' : 'black',
            zerolinewidth: 2
        },
        yaxis: {
            autorange: true,
            gridcolor: useDarkTheme ? '#d3d3d3' : 'black',
            type: linearScale ? 'linear' : 'log',
            zerolinecolor: useDarkTheme ? 'white' : 'black',
            zerolinewidth: 2
        }
    };
}
