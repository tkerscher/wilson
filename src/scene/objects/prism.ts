import { Axis } from "@babylonjs/core/Maths/math.axis";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Matrix, Quaternion } from "@babylonjs/core/Maths/math.vector";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import "@babylonjs/core/Meshes/thinInstanceMesh";

import { Animatible } from "../../model/animatible";
import { ObjectHandle, SceneBuildTool } from "./tools";
import { numToColor } from "../../input/gpuPicking";

const BaseQuaternion = Quaternion.RotationAxis(Axis.X, 0.5 * Math.PI);

//Specialize Animatible type for case of prisms
export type PrismAnimatible = Animatible & { instance: { $case: "prism" }}

//To drastically increase performance, we'll use instances rendering.
//Prisms with the same amount of edges can share the same template mesh.

//A proxy class for manipulating the instance buffer while appearing to be
//a normal mesh
class PrismProxy implements ObjectHandle {
    id: number;
    #index: number;

    name: string;
    description: string;

    #color = new Color4(0.0, 0.0, 0.0, 0.0);
    #position = Vector3.Zero();
    #normal = new Vector3(0.0, 0.0, 1.0);
    #rotation = 0.0;
    #radius = 1.0;
    #height = 1.0;
    #visible = true;

    #dirty = false;

    //reserve memory for quaternion calc to ease the GC use
    #scaling = Vector3.Zero();
    #quatNormal: Quaternion = new Quaternion();
    #quatRot: Quaternion = new Quaternion();
    #quatRes: Quaternion = new Quaternion();
    #mat = new Matrix();

    constructor(prism: PrismAnimatible, index: number, id: number) {
        this.id = id;
        this.#index = index;
        this.name = prism.name;
        this.description = prism.description;
    }

    get color(): Color4 {
        return this.#color;
    }
    set color(value: Color4) {
        this.#color.copyFrom(value);
        this.#dirty = true;
    }

    get position(): Vector3 {
        return this.#position;
    }
    set position(value: Vector3) {
        this.#position.copyFrom(value);
        this.#dirty = true;
    }

    get normal(): Vector3 {
        return this.#normal;
    }
    set normal(value: Vector3) {
        if (value.lengthSquared() <= 1e-5)
            this.#normal = Axis.Z;
        else
            value.normalizeToRef(this.#normal);
        this.#dirty = true;
    }

    get rotation(): number {
        return this.#rotation;
    }
    set rotation(value: number) {
        this.#rotation = value;
        this.#dirty = true;
    }

    get radius(): number {
        return this.#radius;
    }
    set radius(value: number) {
        this.#radius = value;
        this.#dirty = true;
    }

    get height(): number {
        return this.#height;
    }
    set height(value: number) {
        this.#height = value;
        this.#dirty = true;
    }

    get visible(): boolean {
        return this.#visible;
    }
    set visible(value: boolean) {
        this.#visible = value;
        this.#dirty = true;
    }

    update(colorBuffer: Float32Array, matrixBuffer: Float32Array) {
        if (!this.#dirty && !this.#position._isDirty && !this.#normal._isDirty)
            return;

        //update color
        this.#color.toArray(colorBuffer, 4 * this.#index);
        //update matrix
        if (this.#visible) {
            //Update operands
            Quaternion.FromUnitVectorsToRef(Axis.Z, this.#normal, this.#quatNormal);
            Quaternion.RotationAxisToRef(this.#normal, this.#rotation, this.#quatRot);
            //calc quat
            this.#quatRot.multiplyToRef(this.#quatNormal, this.#quatRes);
            this.#quatRes.multiplyInPlace(BaseQuaternion);

            //assemble matrix
            this.#scaling.copyFromFloats(this.#radius, this.#height, this.#radius);
            Matrix.ComposeToRef(this.#scaling, this.#quatRes, this.#position, this.#mat);
            //store matrix
            this.#mat.copyToArray(matrixBuffer, 16 * this.#index);
        }
        else {
            //if the instance should not be visible we make it degenerate
            //i.e. all vertices on the same position, thus zero surface to draw
            matrixBuffer.fill(0.0, this.#index * 16, this.#index * 16 + 16);
        }

        // done
        this.#dirty = false;
    }
}

type PrismTemplateMap = Map<number, Array<PrismProxy>>;

export class PrismBuilder {
    #tool: SceneBuildTool;

    //to drastically increase performance, we'll use instanced rendering for
    //prisms, using only one mesh for prisms with same color and vertex count.
    //We store them in a map to create a sort of library during scene building.
    //The key is the number of vertices followed by the color, e.g. 32#ffffffff

    #template: PrismTemplateMap;

    constructor(tool: SceneBuildTool) {
        this.#tool = tool;
        this.#template = new Map<number, Array<PrismProxy>>();
    }

    build(animatible: PrismAnimatible, id: number): ObjectHandle {
        const prism = animatible.instance.prism;

        //check map
        let arr = this.#template.get(prism.nVertices);
        if (!arr) {
            arr = [];
            this.#template.set(prism.nVertices, arr);
        }

        //lazily create new prism via proxy
        const proxy = new PrismProxy(animatible, arr.length, id);
        //set params
        this.#tool.parseVector(prism.position, proxy, "position");
        this.#tool.parseVector(prism.normal, proxy, "normal");
        this.#tool.parseScalar(prism.rotation, proxy, "rotation");
        this.#tool.parseScalar(prism.radius, proxy, "radius");
        this.#tool.parseScalar(prism.height, proxy, "height");
        this.#tool.parseColor(prism.color, proxy, "color");
        //save proxy
        arr.push(proxy);

        //Done
        return proxy;
    }

    finish(): void {
        //iterate over all prism configurations
        for (const [nVertices, proxies] of this.#template) {
            //create instance buffer of needed size
            const n = proxies.length;
            const colorBuffer = new Float32Array(4 * n);
            const idBuffer = new Float32Array(4 * n);
            const matrixBuffer = new Float32Array(16 * n);

            const template = MeshBuilder.CreateCylinder(
                "prism_template_" + nVertices,
                { tessellation: nVertices, height: 1.0, diameter: 2.0 },
                this.#tool.scene);
            template.material = this.#tool.solidColorInstanceMaterial;
            template.thinInstanceSetBuffer("color", colorBuffer, 4);
            template.thinInstanceSetBuffer("matrix", matrixBuffer, 16);

            //fill idBuffer
            for (const [i, proxy] of proxies.entries()) {
                idBuffer.set(numToColor(proxy.id), 4 * i);
            }

            //wire up picking
            this.#tool.picking.addPickable({
                mesh: template,
                preparePicking: () => template.thinInstanceSetBuffer("color", idBuffer, 4),
                finishPicking: () => template.thinInstanceSetBuffer("color", colorBuffer, 4)
            });

            //hook up to update loop
            this.#tool.scene.onBeforeRenderObservable.add(() => {
                proxies.forEach(p => p.update(colorBuffer, matrixBuffer));

                template.thinInstanceBufferUpdated("color");
                template.thinInstanceBufferUpdated("matrix");
            });
        }
    }
}
