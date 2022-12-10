import { defineStore } from "pinia";
import { Animatible } from "../model/animatible";
import { Project } from "../model/project";

export const useProject = defineStore("project", {
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

        graphs: [],
        paths: [],
        colormap: undefined,

        camera: undefined,

        animatibles: [],
        hiddenGroups: []
    }),
    getters: {
        isEmpty: (state): boolean => {
            return state.animatibles.length == 0;
        }
    },
    actions: {
        loadProject(data: Uint8Array) {
            const project = Project.decode(data);
            this.$patch(project);
        },
        /**
         * Returns the object meta by id
         * @param id Index into flat array of project's object
         * @returns The object's meta or null if not found
         */
        getMetaById(id: number): Animatible | null {
            if (id < this.$state.animatibles.length) {
                return this.$state.animatibles[id];
            }
            else {
                return null;
            }
        }
    }
});
