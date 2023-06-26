import { Axis } from "@babylonjs/core/Maths/math.axis";
import { InstancedMesh } from "@babylonjs/core/Meshes/instancedMesh";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Quaternion } from "@babylonjs/core/Maths/math.vector";

import { ColorProperty } from "../../model/properties";
import { Prism } from "../../model/prism";
import { toHex } from "../../util/colorToHex";
import { Metadata, SceneBuildTool } from "./tools";
import { RotationProxy } from "../../util/rotation";

const BaseQuaternion = Quaternion.RotationAxis(Axis.X, 0.5 * Math.PI);

export class PrismBuilder {
    #tool: SceneBuildTool;

    //to drastically increase performance, we'll use instanced rendering for
    //prisms, using only one mesh for prisms with same color and vertex count.
    //We store them in a map to create a sort of library during scene building.
    //The key is the number of vertices followed by the color, e.g. 32#ffffffff

    #template: Map<string, Mesh>;

    constructor(tool: SceneBuildTool) {
        this.#tool = tool;
        this.#template = new Map<string, Mesh>();
    }

    build(prism: Prism, meta: Metadata) {
        //Either instance static template or create new prism
        let obj: Mesh|InstancedMesh;
        if (this.#tool.isStaticMaterial(prism.color)) {
            //instance template
            const template = this.#getTemplate(prism.nVertices, prism.color);
            obj = template.createInstance(meta.name);
        }
        else {
            //not static -> create new prism with default dimension
            obj = MeshBuilder.CreateCylinder(meta.name, {
                tessellation: prism.nVertices, height: 1.0, diameter: 2.0
            }, this.#tool.scene);
            obj.material = this.#tool.parseColor(prism.color, meta.name + "_mat");
        }

        //set meta
        this.#tool.applyMetadata(obj, meta);

        //set params
        this.#tool.parseScalar(prism.radius, obj, "scaling.x");
        this.#tool.parseScalar(prism.radius, obj, "scaling.z"); //TODO: Can we reuse the animation?
        this.#tool.parseScalar(prism.height, obj, "scaling.y");
        this.#tool.parseVector(prism.position, obj, "position");
        //set rotation via proxy
        const proxy = new RotationProxy(obj, "rotationQuaternion", BaseQuaternion);
        this.#tool.parseScalar(prism.rotation, proxy, "rotation");
        this.#tool.parseVector(prism.normal, proxy, "normal");

        //Freeze for performance if static
        if (prism.radius?.source?.$case != "graphId" &&
            prism.height?.source?.$case != "graphId" &&
            prism.normal?.source?.$case != "pathId" &&
            prism.rotation?.source?.$case != "graphId" &&
            prism.position?.source?.$case != "pathId")
        {
            obj.freezeWorldMatrix();
        }
    }

    #getTemplate(nVertices: number, color: ColorProperty|undefined): Mesh {
        //! You must externally ensure that color is indeed static
        //  Only then we can safely assume, that the next call will
        //  NOT create a new material, but return a static one

        //ask builder for color (material)
        const mat = this.#tool.parseColor(color, "");
        const clr = mat.diffuseColor;
        //create key from color and #vertices
        const key = nVertices.toString() + "#" + toHex(clr.r, clr.g, clr.b, mat.alpha);

        //check if there is already a template for that configuration
        const template = this.#template.get(key);
        if (template) {
            //found template -> return it
            return template;
        }
        else {
            //new configuration -> create new template
            const mesh = MeshBuilder.CreateCylinder(
                "prismTemplate_" + key,
                { tessellation: nVertices, diameter: 2.0, height: 1.0 },
                this.#tool.scene
            );
            mesh.isVisible = false;
            mesh.material = mat;
            //register template
            this.#template.set(key, mesh);
            //return template
            return mesh;
        }
    }
}
