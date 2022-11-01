import { Mesh } from "@babylonjs/core/Meshes/mesh"
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder"
import { Vector3 } from "@babylonjs/core/Maths/math.vector"
import { Scene } from "@babylonjs/core/scene"
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial"
import { RawTexture } from "@babylonjs/core/Materials/Textures/rawTexture"
import { Tube } from "../../model/tube";
import { PathInterpolator } from "../../interpolation/pathInterpolation";
import { GraphInterpolator } from "../../interpolation/graphInterpolation";
import { SceneBuildTool } from "./tools";

const TEXTURE_SIZE = 2048

//Tube growing animation needs to modify the mesh and is thus a bit more
//complicated. The modifying must happen before each render. It's logic
//is encapsulated in the following class

export class TubeController {
    #name: string
    #growing: boolean
    #mesh: Mesh | undefined
    #startTime: number
    #endTime: number
    #scene: Scene

    //Data

    #pathInt: PathInterpolator
    #radInt: GraphInterpolator
    #keys: Array<number>
    #path: Array<Vector3>
    #radii: Array<number>
    #N: number

    constructor(tool: SceneBuildTool, tube: Tube) {
        //copy meta
        this.#name = tube.name
        this.#growing = tube.isGrowing
        this.#scene = tool.scene    

        //create interpolators
        this.#pathInt = new PathInterpolator(tube.pathId, tool.project)
        this.#radInt = new GraphInterpolator(tube.radius, tool.project)

        //collect animation key times
        this.#keys = this.#pathInt.path.map(p => p.time)
            .concat(this.#radInt.points.map(p => p.time))
        //remove duplicates
        this.#keys.sort((a, b) => a - b)
        this.#keys = this.#keys.filter((t, idx) =>
            !(idx > 0 && Math.abs(this.#keys[idx - 1] - t) < 1e-7))

        //panic: We need at least two points to create a tube
        if (this.#keys.length < 2) {
            this.#startTime = 0.0
            this.#endTime = 0.0
            this.#path = []
            this.#radii = []
            this.#N = 0
            return
        }

        //set endtime
        this.#N = this.#keys.length
        this.#startTime = this.#keys[0]
        this.#endTime = this.#keys[this.#N - 1]
        const period = this.#endTime - this.#startTime
        
        //fill control points
        this.#path = this.#keys.map(t => this.#pathInt.interpolate(t))
        this.#radii = this.#keys.map(t => this.#radInt.interpolate(t))

        //we need two extra points for interpolation
        this.#path.push(this.#path[this.#N - 1], this.#path[this.#N - 1])

        //create mesh
        this.#mesh = this.#createMesh(tool.project.meta?.startTime ?? 0.0)
        tool.applyMetadata(this.#mesh, tube)

        //Static color?
        if (!tube.color || !tube.color.source || tube.color.source.$case != 'graphId') {
            this.#mesh.material = tool.parseColor(tube.color, tube.name + '_color')
        }
        else {
            //graph as color source -> check if id is valid
            const id = tube.color.source.graphId
            const graph = tool.project.graphs.find(g => g.id == id)
            if (!graph || graph.points.length == 0) {
                //fall back
                this.#mesh.material = tool.defaultMaterial
            }
            else {
                const graphInt = new GraphInterpolator(id, tool.project)
                const startTime = this.#startTime
                const data = new Uint8Array(function*() {
                    for (let i = 0; i < TEXTURE_SIZE; ++i) {
                        const t = i / TEXTURE_SIZE * period + startTime
                        const v = graphInt.interpolate(t)
                        const [color, alpha] = tool.mapColor(v)

                        yield color.r * 255
                        yield color.g * 255
                        yield color.b * 255
                        yield alpha * 255
                    }
                }())

                //bake texture
                const texture = RawTexture.CreateRGBATexture(
                    data, 1, TEXTURE_SIZE,
                    tool.scene)
                
                //assign texture
                const mat = new StandardMaterial(tube.name + '_mat', tool.scene)
                mat.diffuseTexture = texture
                this.#mesh.material = mat
            }
        }
    }

    update(t: number) {  
        //safety guard
        if (this.#keys.length < 2) {
            return
        }
        
        //shortcut: static tubes do not need to be updated
        if (!this.#growing && this.#mesh != undefined) {
            return
        }

        //update mesh
        this.#mesh = this.#createMesh(t)
    }
    #createMesh(t: number): Mesh {        
        //Build complete if not growing or t is high enough
        if (!this.#growing || t > this.#endTime) {
            return MeshBuilder.CreateTube(this.#name, {
                path: this.#path.slice(0,-2), //remove interpolation points
                radiusFunction: (i) => this.#radii[i],
                tessellation: 64,
                sideOrientation: Mesh.DOUBLESIDE,
                updatable: true,
                instance: this.#mesh
            }, this.#scene)
        }

        //Edge case: t earlier than first key frame (plus some slack) -> render empty
        if (t - this.#startTime <= 1e-4) {
            return MeshBuilder.CreateTube(this.#name, {
                    path: this.#path,
                    radius: 0.0,
                    sideOrientation: Mesh.DOUBLESIDE,
                    updatable: true,
                    instance: this.#mesh
                }, this.#scene)
        }

        //get last index before t
        const lastIdx = this.#keys.findIndex(key => key >= t)
        //copy path until before t
        const path = this.#path.slice(0,lastIdx)
        //interpolate until t if necessary
        if (t - this.#keys[lastIdx] < 1e-7) {
            const grad = this.#path[lastIdx].subtract(this.#path[lastIdx - 1]).normalize()
            const p = this.#pathInt.interpolate(t)
            path[lastIdx] = p
            path[lastIdx + 1] = p.add(grad.scaleInPlace(1e-6))
        }
        //copy rest of path
        path.push(...this.#path.slice(lastIdx,-2))

        const rad = (i: number): number => {
            if (i < lastIdx) {
                return this.#radii[i]
            }
            else if (i == lastIdx) {
                return this.#radInt.interpolate(t)
            }
            else {
                return 0.0
            }
        }

        //update mesh
        return MeshBuilder.CreateTube(this.#name, {
            path: path,
            radiusFunction: rad,
            sideOrientation: Mesh.DOUBLESIDE,
            updatable: true,
            instance: this.#mesh
        }, this.#scene)
    }

    get isEnabled(): boolean {
        return this.#mesh?.isEnabled() ?? false
    }
}
