import { defineStore } from "pinia"
import { Graph } from "../model/graph"
import { Label } from "../model/label"
import { Line } from "../model/line"
import { Path } from "../model/path"
import { Project } from "../model/project"
import { Sphere } from "../model/sphere"
import { Tube } from "../model/tube"

export const useProject = defineStore('project', {
    state: (): Project => ({
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
    }),
    getters: {
        isEmpty: (state): boolean => {
            //Check if there is anything to draw
            //array.some returns false on empty ones
            return !state.spheres.some(s => s.isVisible) &&
                   !state.lines.some(l => l.isVisible) &&
                   !state.tubes.some(t => t.isVisible) &&
                   !state.labels.some(l => l.isVisible);
        }
    },
    actions: {
        loadProject(file: File) {
            file.arrayBuffer().then(buffer => {
                const array = new Uint8Array(buffer)
                const project = Project.decode(array)
                this.$patch(project)
                //Debug:
                console.log(Project.toJSON(project))
            })
        }
    }
})
