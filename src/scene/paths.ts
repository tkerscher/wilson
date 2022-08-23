import {
    Color3,
    Mesh,
    MeshBuilder, 
    Scene,
    StandardMaterial,
    Vector3
} from "@babylonjs/core"
import { Project } from "../model/project"

export class PathVisualizer {
    #scene: Scene
    #project: Project
    #activePaths: Map<number, Mesh>

    constructor(scene: Scene, project: Project) {
        this.#scene = scene
        this.#project = project
        this.#activePaths = new Map<number, Mesh>()
    }

    setPath(id: number, enabled: boolean, color: string) {
        //check for valid path id
        if (this.#project.paths.findIndex(p => p.id == id) == -1)
            return //nothing found

        //get path
        const path = this.#activePaths.has(id) ?
            this.#activePaths.get(id)! :
            this.#createPath(id)
        
        //set
        path.setEnabled(enabled)
        const mat = path.material as StandardMaterial
        mat.diffuseColor = Color3.FromHexString(color)
    }

    #createPath(id: number): Mesh {
        const path = this.#project.paths.find(p => p.id == id)!

        //Translate path from model -> babylon
        const points = path.points.map(p => new Vector3(
            p.position?.x ?? 0,
            p.position?.y ?? 0,
            p.position?.z ?? 0
        ))

        //Create Tube
        const tube = MeshBuilder.CreateTube(path.name, {
            path: points,
            radius: 0.05},
            this.#scene)
        tube.material = new StandardMaterial(path.name + '_material', this.#scene)

        //Done
        this.#activePaths.set(id, tube)
        return tube
    }
}
