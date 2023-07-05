import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Quaternion, Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

import { Line } from "../../model/line";
import { Metadata, SceneBuildTool } from "./tools";
import { setProperty } from "../../util/property";

const EY = new Vector3(0.0,1.0,0.0);

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

//util: align Vector to ey
function alignVector(dir: Vector3): Quaternion {
    //get rotation axis
    let axis = EY.cross(dir);
    //get rotation angle
    let theta = Math.acos(Vector3.Dot(EY, dir));

    //Check if parallel, it might be actually 180 degree
    // -> check y component (pos -> 0, neg -> 180)
    //also the rotation axis will be degenerate
    // -> use any, it does not matter
    if (theta < 1e-7) {
        axis = new Vector3(1.0,0.0,0.0); //rotate around e_x
        if (dir.y < 0.0)
            theta = Math.PI; //radians
    }
    else if(theta > 3.141592) {
        axis = new Vector3(1.0,0.0,0.0); //rotate around e_x
        if (dir.y > 0.0)
            theta = Math.PI; //radians
    }

    //create rotation quaternion
    return Quaternion.RotationAxis(axis, theta);
}

class LineProxy {
    target: Mesh;

    #start = Vector3.Zero();
    #end = Vector3.Zero();
    #dir = Vector3.Zero();

    constructor(target: Mesh) {
        this.target = target;
    }

    get start(): Vector3 {
        return this.#start;
    }
    set start(value: Vector3) {
        this.#start = value;
        this.#update();
    }

    get end(): Vector3 {
        return this.#end;
    }
    set end(value: Vector3) {
        this.#end = value;
        this.#update();
    }

    #update(): void {
        this.#end.subtractToRef(this.start, this.#dir);

        const d = this.#dir.length();
        setProperty(this.target, "scaling.y", d);

        this.#dir.normalize();
        const rot = alignVector(this.#dir);
        setProperty(this.target, "rotationQuaternion", rot);
    }
}

export function buildLine(tool: SceneBuildTool, line: Line, meta: Metadata) {
    let mesh;
    if (!line.pointForward && !line.pointBackward) {
        //create simple unit tube
        mesh = MeshBuilder.CreateLathe(meta.name, { shape: lineShape, tessellation: 24 });
    }
    else if(line.pointForward && !line.pointBackward) {
        mesh = MeshBuilder.CreateLathe(meta.name, { shape: forwardArrowShape, tessellation: 24 });
    }
    else if(!line.pointForward && line.pointBackward) {
        mesh = MeshBuilder.CreateLathe(meta.name, { shape: backwardArrowShape, tessellation: 24 });
    }
    else {
        mesh = MeshBuilder.CreateLathe(meta.name, { shape: doubleArrowShape, tessellation: 24 });
    }
    tool.applyMetadata(mesh, meta);

    const mat = tool.parseColor(line.color, "material");
    mesh.material = mat;

    const proxy = new LineProxy(mesh);
    tool.parseVector(line.start, proxy, "start");
    tool.parseVector(line.end, proxy, "end");

    tool.parseScalar(line.lineWidth, mesh, "scaling.z");
    tool.parseScalar(line.lineWidth, mesh, "scaling.x");
    tool.parseVector(line.start, mesh, "position");
}
