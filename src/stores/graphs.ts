import { defineStore } from "pinia"
import { Graph } from "../model/graph"
import { ref } from "vue"

export interface GraphHandle extends Graph {
    visible: boolean
}

export const useGraphs = defineStore('graphs', () => {
    const graphs = ref<Array<GraphHandle>>([])

    return { graphs }
})
