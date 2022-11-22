interface _WorkerEvent {
    type: string
}

export interface AnimationLoopEvent extends _WorkerEvent {
    type: "onAnimationLoop"
}
export interface FrameChangedEvent extends _WorkerEvent {
    type: "onFrameChanged"
    currentFrame: number
}
export interface ObjectPickedEvent extends _WorkerEvent {
    type: "onObjectPicked"
    objectId: number|null
}

export type WorkerEvent = AnimationLoopEvent | FrameChangedEvent | ObjectPickedEvent

//indicated that the scene has been created inside the worker
//and holds the initial state of the newly created scene
export interface SceneInitializedEvent {
    currentFrame: number
    isPlaying: boolean
    isStatic: boolean
    speedRatio: number
    isGridEnabled: boolean
}
