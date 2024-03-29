import { Color3 } from "@babylonjs/core/Maths/math.color";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Node } from "@babylonjs/core/node";
import { Scene } from "@babylonjs/core/scene";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { GridMaterial } from "@babylonjs/materials/grid/gridMaterial";

const XColor = new Color3(1, 0.255, 0.212);
const YColor = new Color3(0.18, 0.8, 0.251);

export function buildGrid(scene: Scene): Node {
    //create parent node
    const node = new Node("gridNode", scene);

    //grid material
    const material = new GridMaterial("gridMaterial", scene);
    material.majorUnitFrequency = 5;
    material.minorUnitVisibility = 0.45;
    material.gridRatio = 2;
    material.backFaceCulling = false;
    material.mainColor = new Color3(0.471, 0.471, 0.471); //default color
    material.lineColor = new Color3(0.471, 0.471, 0.471);
    material.opacity = 0.98;

    //grid plane
    const plane = MeshBuilder.CreatePlane("grid", { size: 1000 }, scene);
    plane.material = material;
    plane.parent = node;
    plane.isPickable = false;

    //x axis
    const xMat = new StandardMaterial("xAxis_mat", scene);
    xMat.diffuseColor = XColor;
    const xAxis = MeshBuilder.CreateTube("xAxis", {
        path: [ new Vector3(-500,0,0), new Vector3(500,0,0)],
        radius: 0.05
    }, scene);
    xAxis.material = xMat;
    xAxis.parent = node;
    xAxis.isPickable = false;

    //y axis
    const yMat = new StandardMaterial("xAxis_mat", scene);
    yMat.diffuseColor = YColor;
    const yAxis = MeshBuilder.CreateTube("xAxis", {
        path: [ new Vector3(0,-500,0), new Vector3(0,500,0)],
        radius: 0.05
    }, scene);
    yAxis.material = yMat;
    yAxis.parent = node;
    yAxis.isPickable = false;

    return node;
}
