import { Project } from "../../model/project";

export type SceneObjectType = "Sphere" | "Line" | "Tube" | "Overlay"

export interface SceneObject {
    name: string //! NOTE: Copy of the name -> Not synced with project store
    description: string
    visible: boolean
    id: number
    type: SceneObjectType
}

export interface SceneGroup {
    name: string
    visible: boolean
    objects: Array<SceneObject>
    subgroups: Array<SceneGroup>
}

export function extractGroups(project: Project): SceneGroup {
    let id = 0;
    const name = project.meta?.name ?? "";


    interface Node {
        name: string
        visible: boolean
        objects: Array<SceneObject>
        children: Map<string, Node>
    }
    const root: Node = {
        name: name.length > 0 ? name : "Unnamed Project",
        objects: [],
        visible: true,
        children: new Map<string, Node>()
    };

    //Returns the node of specified path, creating missing links as necessary
    function getNode(path: string): Node {
        let parent = root;
        for (const group of path.split("/")) {
            const child = parent.children.get(group);
            if (child)
                parent = child;
            else {
                const node: Node = {
                    name: group,
                    visible: true,
                    objects: [],
                    children: new Map<string, Node>()
                };
                parent.children.set(group, node);
                parent = node;
            }
        }
        return parent;
    }
    //Groups object in all specified groups or root if none
    function groupObject(object: SceneObject, groups: string[]) {
        if (groups.length == 0) {
            root.objects.push(object);
        }
        else {
            for (const path of groups) {
                getNode(path).objects.push(object);
            }
        }
    }

    // For the id to match we have to make sure that the order of object
    // creation are identical to the scene builder.

    project.spheres.forEach(sphere => {
        const obj: SceneObject = {
            name: sphere.name,
            description: sphere.description,
            visible: true,
            id: id++,
            type: "Sphere"
        };
        groupObject(obj, sphere.groups);
    });
    project.lines.forEach(line => {
        const obj: SceneObject = {
            name: line.name,
            description: line.description,
            visible: true,
            id: id++,
            type: "Line"
        };
        groupObject(obj, line.groups);
    });
    project.tubes.forEach(tube => {
        const obj: SceneObject = {
            name: tube.name,
            description: tube.description,
            visible: true,
            id: id++,
            type: "Tube"
        };
        groupObject(obj, tube.groups);
    });
    project.overlays.forEach(overlay => {
        const obj: SceneObject = {
            name: overlay.name,
            description: overlay.description,
            visible: true,
            id: id++,
            type: "Overlay"
        };
        groupObject(obj, overlay.groups);
    });

    // Check which group are invisible
    function hideNode(node: Node) {
        node.visible = false;
        node.objects.forEach(obj => obj.visible = false);
        node.children.forEach(node => hideNode(node));
    }
    project.hiddenGroups.forEach(group => hideNode(getNode(group)));

    // Create root group (get rid of map)
    function processNode(node: Node): SceneGroup {
        return {
            name: node.name,
            visible: node.visible,
            objects: node.objects,
            subgroups: Array.from(node.children.values())
                .map(n => processNode(n))
                .sort((a, b) => a.name.localeCompare(b.name))
        };
    }
    return processNode(root);
}
