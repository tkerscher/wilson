import { defineStore } from "pinia"
import { ref } from "vue"
import { useProject } from "./project"

export type ObjectType = 'Sphere' | 'Line' | 'Tube' | 'Label'

export interface Object {
    name: string //! NOTE: Copy of the name -> Not synced with project store
    description: string
    id: number
    type: ObjectType
}

export interface Group {
    name: string
    visible: boolean
    members: Array<Object>
}

export const useObjects = defineStore('objects', () => {
    //state
    const groups = ref<Array<Group>>([])
    const selectedObjectIdx = ref<number|null>(null)
    
    //Project Parsing Routine
    const project = useProject()
    function parseProject() {
        if (project.isEmpty) {
            groups.value = []
            return
        }

        let id = 0
        let map = new Map<string, Group>()
        function getGroup(name: string): Group {
            if (map.has(name))
                return map.get(name)!
            else {
                const empty: Group = {
                    name: name,
                    visible: true,
                    members: []
                }
                map.set(name, empty)
                return empty
            }
        }

        project.spheres.forEach(sphere =>
            getGroup(sphere.group).members.push({
                name: sphere.name,
                description: sphere.description,
                id: id++,
                type: 'Sphere'
            }))
        project.lines.forEach(line =>
            getGroup(line.group).members.push({
                name: line.name,
                description: line.description,
                id: id++,
                type: 'Line'
            }))
        project.tubes.forEach(tube =>
            getGroup(tube.group).members.push({
                name: tube.name,
                description: tube.description,
                id: id++,
                type: 'Tube'
            }))
        project.labels.forEach(label =>
            getGroup(label.group).members.push({
                name: label.name,
                description: label.description,
                id: id++,
                type: 'Label'
            }))

        groups.value = Array.from(map.values()).sort((a, b) => {
            //Ensure the ungrouped ones are last
            if (a.name.length == 0)
                return 1;
            if (b.name.length == 0)
                return -1;
            
            return a.name.localeCompare(b.name)
        })
    }
    parseProject()
    project.$subscribe(parseProject, { detached: true })

    return { groups, selectedObjectIdx }
})
