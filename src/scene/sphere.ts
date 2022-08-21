import { MeshBuilder } from "@babylonjs/core";
import { Sphere } from "../model/sphere";
import { SceneBuilder } from "./sceneBuilder";

export function buildSphere(builder: SceneBuilder, sphere: Sphere) {
    var mesh = MeshBuilder.CreateSphere(sphere.name, undefined, builder.scene)
    mesh.uniqueId = builder.nextId++
    mesh.parent = builder.getGroup(sphere.group)

    builder.parseScalar(sphere.radius, mesh, "scalingDeterminant")
    builder.parseVector(sphere.position, mesh, "position")

    const mat = builder.parseColor(sphere.color, "material")
    mesh.material = mat
}
