import { InstancedMesh } from "@babylonjs/core/Meshes/instancedMesh";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";

import { ColorProperty } from "../../model/properties";
import { Sphere } from "../../model/sphere";
import { toHex } from "../../util/colorToHex";
import { Metadata, SceneBuildTool } from "./tools";

export class SphereBuilder {
    #tool: SceneBuildTool;

    //To drastically increase performance, we'll use instanced rendering for
    //spheres, i.e. one sphere is drawn many times, but with different trans-
    //formations. They need to share their color, however. Thus we need a map
    //for colors and the corresponding template sphere

    #template: Map<string, Mesh>;

    constructor(tool: SceneBuildTool) {
        this.#tool = tool;
        this.#template = new Map<string, Mesh>();
    }

    build(sphere: Sphere, meta: Metadata) {
        //Either instance static template or create new sphere
        let obj: Mesh|InstancedMesh;
        if (this.#tool.isStaticMaterial(sphere.color)) {
            //instance template
            const template = this.#getTemplate(sphere.color);
            obj = template.createInstance(meta.name);
        }
        else {
            //not static -> create new sphere with radius 1...
            obj = MeshBuilder.CreateSphere(meta.name, { diameter: 2.0 }, this.#tool.scene);
            // ... with its own material
            obj.material = this.#tool.parseColor(sphere.color, meta.name + "_mat");
        }

        //set meta
        this.#tool.applyMetadata(obj, meta);

        //set params
        this.#tool.parseScalar(sphere.radius, obj, "scalingDeterminant");
        this.#tool.parseVector(sphere.position, obj, "position");

        //See if static object
        if (sphere.radius?.source?.$case != "graphId" &&
            sphere.position?.source?.$case != "pathId")
        {
            obj.freezeWorldMatrix();
        }
    }

    #getTemplate(color: ColorProperty|undefined): Mesh {
        //! You must externally ensure that color is indeed static
        //  Only then we can safely assume, that the next call will
        //  NOT create a new material, but return a static one

        //ask builder for color (material)
        const mat = this.#tool.parseColor(color, "");
        const clr = mat.diffuseColor;
        //create key from color
        const key = toHex(clr.r, clr.g, clr.b, mat.alpha);

        //check if that color already has a sphere template
        const template = this.#template.get(key);
        if (template) {
            //found template -> return it
            return template;
        }
        else {
            //new color -> create new template
            const mesh = MeshBuilder.CreateSphere("sphereTemplate_#" + key, { diameter: 2.0 }, this.#tool.scene);
            mesh.isVisible = false;
            mesh.material = this.#tool.parseColor(color, "");
            //register template
            this.#template.set(key, mesh);
            //return template
            return mesh;
        }
    }
}
