import { defineStore } from "pinia";
import { Graph } from "../model/graph";
import { computed, ref } from "vue";

export interface GraphHandle extends Graph {
    visible: boolean
}

export const useGraphs = defineStore("graphs", () => {
    const graphs = ref<Array<GraphHandle>>([]);
    const visible = computed(() => graphs.value.filter(g => g.visible));

    return { graphs, visible };
});
