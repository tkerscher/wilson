import { InstancedMesh, Mesh, MeshBuilder } from "@babylonjs/core";
import { ColorProperty } from "../model/properties";
import { Sphere } from "../model/sphere";
import { toHex } from "../util/colorToHex";
import { Metadata, SceneBuilder } from "./sceneBuilder";

export class SphereBuilder {
    #builder: SceneBuilder
    #template: Map<string, Mesh>

    constructor(builder: SceneBuilder) {
        this.#builder = builder
        this.#template = new Map<string, Mesh>()
    }

    build(sphere: Sphere) {
        //Either instance static template or create new sphere
        let obj: Mesh|InstancedMesh
        if (this.#builder.isStaticMaterial(sphere.color)) {
            //instance template
            const template = this.#getTemplate(sphere.color)
            obj = template.createInstance(sphere.name)
        }
        else {
            //not static -> create new sphere ...
            obj = MeshBuilder.CreateSphere(sphere.name, {}, this.#builder.scene)
            // ... with its own material
            obj.material = this.#builder.parseColor(sphere.color, sphere.name + "_mat")
        }

        //set meta
        obj.uniqueId = this.#builder.nextId++
        obj.parent = this.#builder.getGroup(sphere.group)
        obj.metadata = {
            name: sphere.name,
            description: sphere.description
        } as Metadata //for type safety

        //set params
        this.#builder.parseScalar(sphere.radius, obj, "scalingDeterminant")
        this.#builder.parseVector(sphere.position, obj, "position")

        //See if static object
        if (sphere.radius?.source?.$case != 'graphId' &&
            sphere.position?.source?.$case != 'pathId')
        {
            obj.freezeWorldMatrix()
        }
    }

    #getTemplate(color: ColorProperty|undefined): Mesh {
        //! You must externally ensure that color is indeed static
        //  Only then we can safely assume, that the next call will
        //  NOT create a new material, but return a static one
        
        //ask builder for color (material)
        const mat = this.#builder.parseColor(color, '')
        const clr = mat.diffuseColor
        //create key from color
        const key = toHex(clr.r, clr.g, clr.b, mat.alpha)
        
        //check if that color already has a sphere template
        if (this.#template.has(key)) {
            //found template -> return it
            return this.#template.get(key)!
        }
        else {
            //new color -> create new template
            const mesh = MeshBuilder.CreateSphere('sphereTemplate_#' + key, {}, this.#builder.scene)
            mesh.isVisible = false
            mesh.material = this.#builder.parseColor(color, "")
            //register template
            this.#template.set(key, mesh)
            //return template
            return mesh
        }
    }
}
