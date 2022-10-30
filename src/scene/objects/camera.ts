import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera"
import { Vector3 } from "@babylonjs/core/Maths/math.vector"
import { Camera } from "../../model/camera"
import { SceneBuildTool } from "./tools"

export function buildCamera(tool: SceneBuildTool, camera: Camera|undefined): ArcRotateCamera {
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

    const cam = new ArcRotateCamera("camera", 0.0, 0.0, 1.0, target, tool.scene)
    cam.upVector = new Vector3(0,0,1)
    cam.setPosition(position)

    return cam
}
