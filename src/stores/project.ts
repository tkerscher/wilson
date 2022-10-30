import { defineStore } from "pinia"
import { Graph } from "../model/graph"
import { Line } from "../model/line"
import { Path } from "../model/path"
import { Project } from "../model/project"
import { Sphere } from "../model/sphere"
import { Tube } from "../model/tube"
import { Overlay } from "../model/overlay"

export type ObjectMeta = Sphere | Line | Tube | Overlay;

export const useProject = defineStore('project', {
    state: (): Project => ({
        //Init empty project. See model/project
        meta: {
            name: "New Project",
            author: "",
            description: "",
            date: { seconds: 0, nanos: 0 },
            startTime: 0.0,
            endTime: 0.0,
            speedRatio: 1.0
        },

        graphs: <Graph[]>[],
        paths: <Path[]>[],
        colormap: undefined,

        camera: undefined,

        spheres: <Sphere[]>[],
        lines: <Line[]>[],
        tubes: <Tube[]>[],
        overlays: <Overlay[]>[],

        hiddenGroups: []
    }),
    getters: {
        isEmpty: (state): boolean => {
            return state.spheres.length == 0 &&
                   state.lines.length == 0 &&
                   state.tubes.length == 0 &&
                   state.overlays.length == 0;
        }
    },
    actions: {
        loadProject(data: Uint8Array) {
            const project = Project.decode(data)
            console.log(project)
            this.$patch(project)
        },
        /**
         * Returns the object meta by id
         * @param id Index into flat array of project's object
         * @returns The object's meta or null if not found
         */
        getMetaById(id: number): ObjectMeta | null {
            //Is it a sphere?
            if (id < this.$state.spheres.length) {
                return this.$state.spheres[id]
            }
            else {
                id -= this.$state.spheres.length;
            }
            //Is it a line?
            if (id < this.$state.lines.length) {
                return this.$state.lines[id]
            }
            else {
                id -= this.$state.lines.length
            }
            //Is it a tube?
            if (id < this.$state.tubes.length) {
                return this.$state.tubes[id]
            }
            else {
                id -= this.$state.tubes.length
            }
            //Is it a label?
            if (id < this.$state.overlays.length) {
                return this.$state.overlays[id]
            }
            else {
                //ran out of objects
                return null
            }
        }
    }
})
