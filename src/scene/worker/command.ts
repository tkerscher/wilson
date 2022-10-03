interface _WorkerCommand {
    type: string
}

export interface PlayCommand extends _WorkerCommand {
    type: 'play',
    loop: boolean
}
export interface PauseCommand extends _WorkerCommand {
    type: 'pause'
}
export interface GoToFrameCommand extends _WorkerCommand {
    type: 'goToFrame',
    frame: number
}
export interface ResetCameraCommand extends _WorkerCommand {
    type: 'resetCamera'
}
export interface SelectCommand extends _WorkerCommand {
    type: 'select',
    id: number
}
export interface SetGroupEnabledCommand extends _WorkerCommand {
    type: 'setGroupEnabled',
    group: string,
    enabled: boolean
}
export interface SetPathEnabledCommand extends _WorkerCommand {
    type: 'setPathEnabled',
    id: number,
    enabled: boolean,
    color: string
}
export interface SetGridEnabledCommand extends _WorkerCommand {
    type: 'setGridEnabled',
    enabled: boolean
}
export interface SetSpeedRatioCommand extends _WorkerCommand {
    type: 'setSpeedRatio',
    value: number
}
export interface ResizeCommand extends _WorkerCommand {
    type: 'resize',
    width: number,
    height: number
}
export interface ScreenshotCommand extends _WorkerCommand {
    type: 'screenshot'
}

export type WorkerCommand =
    PlayCommand |
    PauseCommand |
    GoToFrameCommand |
    ResetCameraCommand |
    SelectCommand |
    SetGridEnabledCommand |
    SetGroupEnabledCommand |
    SetPathEnabledCommand |
    SetGridEnabledCommand |
    ResizeCommand |
    ScreenshotCommand
