import { UniversalCamera, Vector3 } from "@babylonjs/core"
import { Camera } from "../model/camera"
import { SceneBuilder } from "./sceneBuilder"

export function buildCamera(builder: SceneBuilder, camera: Camera|undefined) {
    var cam = new UniversalCamera("camera", new Vector3(10,10,10), builder.scene)
    cam.target = new Vector3()

    if (camera) {
        builder.parseVector(camera.position, cam, "position")
        builder.parseVector(camera.target, cam, "target")
    }

    cam.attachControl(true)
}
