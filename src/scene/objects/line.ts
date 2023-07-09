import { Axis } from "@babylonjs/core/Maths/math.axis";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Matrix, Quaternion, Vector3 } from "@babylonjs/core/Maths/math.vector";

import { Animatible } from "../../model/animatible";
import { ObjectHandle, SceneBuildTool } from "./tools";
import { numToColor } from "../../input/gpuPicking";

//Specialize Animatible type for case of lines
export type LineAnimatible = Animatible & { instance: { $case: "line" }}

//Outlines for the arrows
const lineShape = [
    new Vector3(0.0,0.0,0.0),
    new Vector3(0.5,0.0,0.0),
    new Vector3(0.5,1.0,0.0),
    new Vector3(0.0,1.0,0.0)];
const backwardArrowShape = [
    new Vector3(0.0,0.0,0.0),
    new Vector3(0.5,0.0,0.0),
    new Vector3(0.5,2./3.,0.0),
    new Vector3(1.0,2./3.,0.0),
    new Vector3(0.0,1.0,0.0)];
const forwardArrowShape = [
    new Vector3(0.0,0.0,0.0),
    new Vector3(1.0,1./3.,0.0),
    new Vector3(0.5,1./3.,0.0),
    new Vector3(0.5,1.0,0.0),
    new Vector3(0.0,1.0,0.0)];
const doubleArrowShape = [
    new Vector3(0.0,0.0,0.0),
    new Vector3(1.0,1./3.,0.0),
    new Vector3(0.5,1./3.,0.0),
    new Vector3(0.5,2./3.,0.0),
    new Vector3(1.0,2./3.,0.0),
    new Vector3(0.0,1.0,0.0)];

class LineProxy implements ObjectHandle {
    id: number;
    index = -1;

    name: string;
    description: string;

    #color = new Color4(0.0, 0.0, 0.0, 0.0);
    #start = Vector3.Zero();
    #end = Vector3.Zero();
    #width = 1.0;
    #visible = true;

    // reuse variables for calculations
    #dir = Vector3.Zero();
    #scaling = Vector3.Zero();
    #quat = new Quaternion();
    #mat = new Matrix();

    #dirty = false;

    constructor(line: LineAnimatible, id: number) {
        this.id = id;
        this.name = line.name;
        this.description = line.description;
    }

    get color(): Color4 {
        return this.#color;
    }
    set color(value: Color4) {
        this.#color.copyFrom(value);
        this.#dirty = true;
    }

    get start(): Vector3 {
        return this.#start;
    }
    set start(value: Vector3) {
        this.#start.copyFrom(value);
        this.#dirty = true;
    }
    get position(): Vector3 {
        return this.#start;
    }

    get end(): Vector3 {
        return this.#end;
    }
    set end(value: Vector3) {
        this.#end.copyFrom(value);
        this.#dirty = true;
    }

    get lineWidth(): number {
        return this.#width;
    }
    set lineWidth(value: number) {
        this.#width = value;
    }

    get visible(): boolean {
        return this.#visible;
    }
    set visible(value: boolean) {
        this.#visible = value;
        this.#dirty = true;
    }

    update(colorBuffer: Float32Array, matrixBuffer: Float32Array) {
        if (!this.#dirty && !this.#start._isDirty && !this.#end._isDirty)
            return;

        //update color
        this.#color.toArray(colorBuffer, 4 * this.index);
        //update matrix
        if (this.#visible) {
            //update operands
            this.#end.subtractToRef(this.#start, this.#dir);
            const d = this.#dir.length();
            this.#dir.normalize();
            Quaternion.FromUnitVectorsToRef(Axis.Y, this.#dir, this.#quat);
            //assemble matrix
            this.#scaling.copyFromFloats(this.#width, d, this.#width);
            Matrix.ComposeToRef(this.#scaling, this.#quat, this.#start, this.#mat);
            //store matrix
            this.#mat.copyToArray(matrixBuffer, 16 * this.index);
        }
        else {
            //if the instance should not be visible we make it degenerate
            //i.e. all vertices on the same position, thus zero surface to draw
            matrixBuffer.fill(0.0, this.index * 16, this.index * 16 + 16);
        }

        //done
        this.#dirty = false;
    }
}

export class LineBuilder {
    #tool: SceneBuildTool;

    #lineProxies = new Array<LineProxy>();
    #forwardProxies = new Array<LineProxy>();
    #backwardProxies = new Array<LineProxy>();
    #doubleProxies = new Array<LineProxy>();

    constructor(tool: SceneBuildTool) {
        this.#tool = tool;
    }

    build(animatible: LineAnimatible, id: number): ObjectHandle {
        //lazily create line
        const proxy = new LineProxy(animatible, id);

        //set params
        const line = animatible.instance.line;
        this.#tool.parseVector(line.start, proxy, "start");
        this.#tool.parseVector(line.end, proxy, "end");
        this.#tool.parseScalar(line.lineWidth, proxy, "lineWidth");
        this.#tool.parseColor(line.color, proxy, "color");

        //store proxy
        if (!line.pointForward && !line.pointBackward) {
            proxy.index = this.#lineProxies.length;
            this.#lineProxies.push(proxy);
        }
        else if(line.pointForward && !line.pointBackward) {
            proxy.index = this.#forwardProxies.length;
            this.#forwardProxies.push(proxy);
        }
        else if(!line.pointForward && line.pointBackward) {
            proxy.index = this.#backwardProxies.length;
            this.#backwardProxies.push(proxy);
        }
        else {
            proxy.index = this.#doubleProxies.length;
            this.#doubleProxies.push(proxy);
        }

        //done
        return proxy;
    }

    finish() {
        this.#finishSingle(this.#lineProxies, lineShape, "line_template");
        this.#finishSingle(this.#forwardProxies, forwardArrowShape, "forwardArrow_template");
        this.#finishSingle(this.#backwardProxies, backwardArrowShape, "backwardArrow_template");
        this.#finishSingle(this.#doubleProxies, doubleArrowShape, "doubleArrow_template");
    }

    #finishSingle(proxies: Array<LineProxy>, shape: Array<Vector3>, name: string) {
        //skip if there is nothing to do
        const n = proxies.length;
        if (n == 0)
            return;

        //create instance buffers
        const colorBuffer = new Float32Array(4 * n);
        const idBuffer = new Float32Array(4 * n);
        const matrixBuffer = new Float32Array(16 * n);

        const template = MeshBuilder.CreateLathe(
            name, { shape: shape, tessellation: 24 }, this.#tool.scene);
        template.thinInstanceSetBuffer("color", colorBuffer, 4);
        template.thinInstanceSetBuffer("matrix", matrixBuffer, 16);

        //fill id buffer
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
