import { Color4 } from "@babylonjs/core/Maths/math.color";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Vector3 } from "@babylonjs/core/Maths/math";
import "@babylonjs/core/Meshes/thinInstanceMesh";

import { Animatible } from "../../model/animatible";
import { ObjectHandle, SceneBuildTool } from "./tools";
import { numToColor } from "../../input/gpuPicking";

// Specialize Animatible type for case of spheres
export type SphereAnimatible = Animatible & { instance: { $case: "sphere" }}

//To drastically increase performance, we'll use instanced rendering for
//spheres, i.e. one sphere is drawn many times, but with different trans-
//formations and colors.

// A proxy class for manipulating the instance buffer
// while appearing to be a normal mesh
class SphereProxy implements ObjectHandle {
    index = -1;

    name: string;
    description: string;

    #color = new Color4(0.0, 0.0, 0.0, 0.0);
    #position = Vector3.Zero();
    #radius = 1.0;
    #visible = true;

    #dirty = false;

    constructor(sphere: SphereAnimatible) {
        this.name = sphere.name;
        this.description = sphere.description;
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

    get radius(): number {
        return this.#radius;
    }
    set radius(value: number) {
        this.#radius = value;
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
        if (!this.#dirty && !this.#position._isDirty)
            return;

        // update buffers in mesh at index

        //update color
        this.#color.toArray(colorBuffer, 4 * this.index);
        //update matrix
        if (this.#visible) {
            // we handle visibility via matrix
            matrixBuffer[16 * this.index + 0] = this.#radius;
            matrixBuffer[16 * this.index + 5] = this.#radius;
            matrixBuffer[16 * this.index + 10] = this.#radius;
            matrixBuffer[16 * this.index + 12] = this.#position.x;
            matrixBuffer[16 * this.index + 13] = this.#position.y;
            matrixBuffer[16 * this.index + 14] = this.#position.z;
            matrixBuffer[16 * this.index + 15] = 1.0;
        }
        else {
            //if the instance should not be visible we make it degenerate
            //i.e. all vertices on the same position, thus zero surface to draw
            matrixBuffer.fill(0.0, this.index * 16, this.index * 16 + 16);
        }

        // done
        this.#dirty = false;
    }
}

export class SphereBuilder {
    #tool: SceneBuildTool;

    #proxies = new Array<SphereProxy>();
    #ids = new Array<number>();

    constructor(tool: SceneBuildTool) {
        this.#tool = tool;
    }

    build(animatible: SphereAnimatible, id: number): ObjectHandle {
        //Lazily create new sphere via proxy
        //We do not need to have the instance buffers ready yet,
        //as they will only be written into once SphereProxy.update() is called
        const proxy = new SphereProxy(animatible);

        //set params
        const sphere = animatible.instance.sphere;
        this.#tool.parseScalar(sphere.radius, proxy, "radius");
        this.#tool.parseVector(sphere.position, proxy, "position");
        this.#tool.parseColor(sphere.color, proxy, "color");

        proxy.index = this.#proxies.length;
        this.#proxies.push(proxy);
        this.#ids.push(id);

        //done
        return proxy;
    }

    finish(): void {
        //skip if there is nothing to do
        const n = this.#proxies.length;
        if (n == 0)
            return;

        // create instance buffer of needed size
        const colorBuffer = new Float32Array(4 * n);
        const idBuffer = new Float32Array(4 * n);
        const matrixBuffer = new Float32Array(16 * n);

        const template = MeshBuilder.CreateSphere("sphere_template",
            { diameter: 2.0 }, this.#tool.scene);

        template.thinInstanceSetBuffer("color", colorBuffer, 4);
        template.thinInstanceSetBuffer("matrix", matrixBuffer, 16);

        // fill up id buffer
        for (const [i, id] of this.#ids.entries()) {
            idBuffer.set(numToColor(id), 4 * i);
        }

        // wire up picking
        this.#tool.picking.addPickable({
            mesh: template,
            preparePicking: () => template.thinInstanceSetBuffer("color", idBuffer, 4),
            finishPicking: () => template.thinInstanceSetBuffer("color", colorBuffer, 4)
        });

        // hook up to update loop
        this.#tool.scene.onBeforeRenderObservable.add(() => {
            this.#proxies.forEach(p => p.update(colorBuffer, matrixBuffer));

            template.thinInstanceBufferUpdated("color");
            template.thinInstanceBufferUpdated("matrix");
        });
    }
}
