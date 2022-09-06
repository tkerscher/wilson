import { MeshBuilder } from "@babylonjs/core";
import { Sphere } from "../model/sphere";
import { SceneBuilder } from "./sceneBuilder";

export function buildSphere(builder: SceneBuilder, sphere: Sphere) {
    var mesh = MeshBuilder.CreateSphere(sphere.name, {
        segments: 16
    }, builder.scene)
    mesh.uniqueId = builder.nextId++
    mesh.parent = builder.getGroup(sphere.group)

    builder.parseScalar(sphere.radius, mesh, "scalingDeterminant")
    builder.parseVector(sphere.position, mesh, "position")

    //See if static object
    if (sphere.radius?.source?.$case != 'graphId' &&
        sphere.position?.source?.$case != 'pathId')
    {
        mesh.freezeWorldMatrix()
    }

    const mat = builder.parseColor(sphere.color, "material")
    mesh.material = mat
}
