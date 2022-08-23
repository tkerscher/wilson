import { defineStore } from "pinia";
import { ref } from "vue";
import { useProject } from "./project";

export interface PathHandle {
    name: string
    id: number
    color: string //hex
    visible: boolean
}

const DefaultColor = '#ff8800' //orange

export const usePaths = defineStore('paths', () => {
    const showHidden = ref(false)
    const paths = ref<Array<PathHandle>>([])
    
    const project = useProject()
    function parseProject() {
        paths.value = project.paths.map(p => ({
            name: p.name,
            id: p.id,
            color: DefaultColor,
            visible: false}))
    }
    parseProject()
    project.$subscribe(parseProject)

    return { paths, showHidden }
})
