import { ArcRotateCamera, UniversalCamera, Vector3 } from "@babylonjs/core"
import { Camera } from "../model/camera"
import { SceneBuilder } from "./sceneBuilder"

export function buildCamera(builder: SceneBuilder, camera: Camera|undefined): ArcRotateCamera {
    const position = new Vector3(
        camera?.position?.x ?? 1.0,
        camera?.position?.y ?? 1.0,
        camera?.position?.z ?? 1.0
    )
    const target = new Vector3(
        camera?.target?.x ?? 0.0,
        camera?.target?.y ?? 0.0,
        camera?.target?.z ?? 0.0
    )

    const cam = new ArcRotateCamera("camera", 0.0, 0.0, 1.0, target, builder.scene)
    cam.upVector = new Vector3(0,0,1)
    cam.setPosition(position)
    cam.attachControl(true)

    return cam
}
