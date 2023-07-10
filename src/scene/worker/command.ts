import { Theme } from "../theme";

interface _WorkerCommand {
    type: string
}

export interface LoadCommand extends _WorkerCommand {
    type: "load"
    data: ArrayBufferLike
}
export interface LoadStageCommand extends _WorkerCommand {
    type: "loadStage"
    url: string
}
export interface RemoveStageCommand extends _WorkerCommand {
    type: "removeStage"
}
export interface PlayCommand extends _WorkerCommand {
    type: "play"
}
export interface PauseCommand extends _WorkerCommand {
    type: "pause"
}
export interface GoToFrameCommand extends _WorkerCommand {
    type: "goToFrame",
    frame: number
}
export interface ResetCameraCommand extends _WorkerCommand {
    type: "resetCamera"
}
export interface SelectCommand extends _WorkerCommand {
    type: "select",
    id: number
}
export interface TargetCommand extends _WorkerCommand {
    type: "target",
    id: number
}
export interface SetObjectsEnabledCommand extends _WorkerCommand {
    type: "setObjectsEnabled",
    objectIds: number[]|null,
    enabled: boolean
}
export interface SetPathEnabledCommand extends _WorkerCommand {
    type: "setPathEnabled",
    id: number,
    enabled: boolean,
    color: string
}
export interface SetGridEnabledCommand extends _WorkerCommand {
    type: "setGridEnabled",
    enabled: boolean
}
export interface SetSpeedRatioCommand extends _WorkerCommand {
    type: "setSpeedRatio",
    value: number
}
export interface ResizeCommand extends _WorkerCommand {
    type: "resize",
    width: number,
    height: number
}
export interface SetThemeCommand extends _WorkerCommand {
    type: "setTheme",
    theme: Theme
}

export interface PointerDownCommand extends _WorkerCommand {
    type: "pointerDown",
    x: number,
    y: number
}

export interface PointerUpCommand extends _WorkerCommand {
    type: "pointerUp",
    x: number,
    y: number
}

export interface PointerMoveCommand extends _WorkerCommand {
    type: "pointermove",
    x: number,
    y: number
}

export interface PanCameraCommand extends _WorkerCommand {
    type: "panCamera",
    dx: number,
    dy: number
}
export interface RotateCameraCommand extends _WorkerCommand {
    type: "rotateCamera",
    alpha: number,
    beta: number
}
export interface ZoomCameraCommand extends _WorkerCommand {
    type: "zoom",
    delta: number
}
export interface SetCameraTargetCommand extends _WorkerCommand {
    type: "setCameraTarget",
    x: number,
    y: number,
    z: number
}
export interface SetCameraRotationCommand extends _WorkerCommand {
    type: "setCameraRotation",
    alpha: number,
    beta: number
}
export interface SetCameraZoomCommand extends _WorkerCommand {
    type: "setCameraZoom",
    distance: number
}

export interface SetColorMapMinScalar extends _WorkerCommand {
    type: "setColorMapMinScalar",
    value: number
}
export interface SetColorMapMaxScalar extends _WorkerCommand {
    type: "setColorMapMaxScalar",
    value: number
}

export type WorkerCommand =
    LoadCommand |
    LoadStageCommand |
    RemoveStageCommand |
    GoToFrameCommand |
    PanCameraCommand |
    PauseCommand |
    PlayCommand |
    PointerDownCommand |
    PointerMoveCommand |
    PointerUpCommand |
    ResetCameraCommand |
    ResizeCommand |
    RotateCameraCommand |
    SelectCommand |
    TargetCommand |
    SetCameraRotationCommand |
    SetCameraTargetCommand |
    SetCameraZoomCommand |
    SetColorMapMinScalar |
    SetColorMapMaxScalar |
    SetGridEnabledCommand |
    SetGridEnabledCommand |
    SetObjectsEnabledCommand |
    SetPathEnabledCommand |
    SetSpeedRatioCommand |
    SetThemeCommand |
    ZoomCameraCommand
