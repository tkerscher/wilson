import { InstancedMesh } from "@babylonjs/core/Meshes/instancedMesh";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";

import { ColorProperty } from "../../model/properties";
import { Sphere } from "../../model/sphere";
import { getStaticColor, isStaticColor, toHex } from "../../util/color";
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
        if (isStaticColor(this.#tool.project, sphere.color)) {
            //instance template
            const template = this.#getTemplate(sphere.color);
            obj = template.createInstance(meta.name);
        }
        else {
            //not static -> create new sphere ...
            obj = MeshBuilder.CreateSphere(meta.name, {}, this.#tool.scene);
            // ... with its own material
            this.#tool.applyMaterial(obj, sphere.color);
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
        //create key from color
        const clr = getStaticColor(this.#tool.project, color);
        const key = toHex(clr);

        //check if that color already has a sphere template
        const template = this.#template.get(key);
        if (template) {
            //found template -> return it
            return template;
        }
        else {
            //new color -> create new template
            const mesh = MeshBuilder.CreateSphere("sphereTemplate_#" + key, {}, this.#tool.scene);
            mesh.isVisible = false;
            this.#tool.applyMaterial(mesh, color);
            //register template
            this.#template.set(key, mesh);
            //return template
            return mesh;
        }
    }
}
