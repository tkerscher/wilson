import { Project } from "../../model/project"

export type ObjectType = 'Sphere' | 'Line' | 'Tube' | 'Overlay'

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

export function extractGroups(project: Project): Group[] {
    let id = 0
    let map = new Map<string, Group>()
    function getGroup(name: string): Group {
        if (map.has(name))
            return map.get(name)!
        else {
            const empty: Group = {
                name: name,
                visible: !project.hiddenGroups.find(g => g == name),
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
    project.overlays.forEach(overlay =>
        getGroup(overlay.group).members.push({
            name: overlay.name,
            description: overlay.description,
            id: id++,
            type: 'Overlay'
        }))

    return Array.from(map.values()).sort((a, b) => {
        //Ensure the ungrouped ones are last
        if (a.name.length == 0)
            return 1;
        if (b.name.length == 0)
            return -1;
        
        return a.name.localeCompare(b.name)
    })
}
