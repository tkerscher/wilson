import {
    Color3,
    MeshBuilder,
    Node,
    Scene,
    StandardMaterial,
    Vector3
} from "@babylonjs/core"
import { GridMaterial } from '@babylonjs/materials'

const XColor = new Color3(1, 0.255, 0.212)
const YColor = new Color3(0.18, 0.8, 0.251)

export function buildGrid(scene: Scene): Node {
    //create parent node
    const node = new Node("gridNode", scene)

    //grid material
    const material = new GridMaterial("gridMaterial", scene)
	material.majorUnitFrequency = 5
	material.minorUnitVisibility = 0.45
	material.gridRatio = 2
	material.backFaceCulling = false
	material.mainColor = new Color3(0.471, 0.471, 0.471)
	material.lineColor = new Color3(0.471, 0.471, 0.471)
	material.opacity = 0.98

    //grid plane
    const plane = MeshBuilder.CreatePlane("grid", { size: 1000 }, scene)
    plane.material = material
    plane.parent = node

    //x axis
    const xMat = new StandardMaterial("xAxis_mat", scene)
    xMat.diffuseColor = XColor
    const xAxis = MeshBuilder.CreateTube("xAxis", {
        path: [ new Vector3(-500,0,0), new Vector3(500,0,0)],
        radius: 0.05
    }, scene)
    xAxis.material = xMat
    xAxis.parent = node

    //y axis
    const yMat = new StandardMaterial("xAxis_mat", scene)
    yMat.diffuseColor = YColor
    const yAxis = MeshBuilder.CreateTube("xAxis", {
        path: [ new Vector3(0,-500,0), new Vector3(0,500,0)],
        radius: 0.05
    }, scene)
    yAxis.material = yMat
    yAxis.parent = node

    return node
}