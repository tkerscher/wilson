import { defineStore } from "pinia"
import { Graph } from "../model/graph"
import { Label } from "../model/label"
import { Line } from "../model/line"
import { Path } from "../model/path"
import { Sphere } from "../model/sphere"
import { Tube } from "../model/tube"

export const useProject = defineStore('project', {
    state: () => ({
        //Init empty project. See model/project
        meta: {
            name: "New Project",
            author: "",
            date: new Date(),
            startTime: 0.0,
            endTime: 0.0,
            speedRatio: 1.0
        },

        graphs: <Graph[]>[],
        paths: <Path[]>[],

        clearColor: { r: 1.0, g: 1.0, b: 1.0 },
        camera: undefined,

        spheres: <Sphere[]>[],
        lines: <Line[]>[],
        tubes: <Tube[]>[],
        labels: <Label[]>[]
    })
})
