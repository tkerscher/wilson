import { ArcRotateCamera, UniversalCamera, Vector3 } from "@babylonjs/core"
import { Camera } from "../model/camera"
import { SceneBuilder } from "./sceneBuilder"

export function buildCamera(builder: SceneBuilder, camera: Camera|undefined): ArcRotateCamera {
    const position = new Vector3(
        camera?.position?.x ?? 0.0,
        camera?.position?.y ?? 0.0,
        camera?.position?.z ?? 0.0
    )
    const target = new Vector3(
        camera?.target?.x ?? 1.0,
        camera?.target?.y ?? 1.0,
        camera?.target?.z ?? 1.0
    )

    const r = position.subtract(target)
    const radius = r.length()
    r.normalize()

    const alpha = Math.acos(r.z)
    const beta = Math.atan2(r.y, r.x)

    const cam = new ArcRotateCamera("camera", alpha, beta, radius, target, builder.scene)
    cam.attachControl(true)

    return cam
}
