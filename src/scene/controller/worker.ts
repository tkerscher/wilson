import {
    GoToFrameCommand,
    PauseCommand,
    PlayCommand,
    ResetCameraCommand,
    ResizeCommand,
    ScreenshotCommand,
    SelectCommand,
    SetGridEnabledCommand,
    SetGroupEnabledCommand,
    SetPathEnabledCommand,
    SetSpeedRatioCommand
} from "../worker/command";
import { Project } from "../../model/project";
import { SceneInitializedEvent, WorkerEvent } from "../worker/event";
import { SceneController } from "./controller";

import SceneWorker from "../worker/script?worker"

export function isWorkerAvailable(): boolean {
    return !!window.Worker &&
        !!HTMLCanvasElement.prototype.transferControlToOffscreen
}

export class WorkerController implements SceneController {
    //Worker related
    #worker: Worker
    Ready: Promise<void>

    //copy of state on host site
    #currentFrame: number = NaN
    #isPlaying: boolean = true
    #isStatic: boolean = true
    #speedRatio: number = 1.0
    #isGridEnabled: boolean = true

    //callbacks
    #onAnimationLoopCallbacks: Array<() => void> = []
    #onFrameChangedCallbacks: Array<(currentFrame: number) => void> = []
    #onObjectPickedCallbacks: Array<(id: number) => void> = []

    constructor(project: Project, canvas: HTMLCanvasElement) {
        //create scene worker
        const worker = new SceneWorker()
        this.#worker = worker

        //serialize project
        const serialized = Project.encode(project).finish().buffer

        //prepare message handler
        const controller = this
        function handleMessage(ev: MessageEvent<any>) {
            const event = ev.data as WorkerEvent
            switch(event.type) {
            case 'onAnimationLoop':
                controller.#onAnimationLoopCallbacks.forEach(fn => fn())
                break
            case 'onFrameChanged':
                controller.#currentFrame = event.currentFrame
                controller.#onFrameChangedCallbacks.forEach(fn => fn(event.currentFrame))
                break
            case 'onObjectPicked':
                controller.#onObjectPickedCallbacks.forEach(fn => fn(event.objectId))
                break
            }
        }

        //pass data to worker for init
        this.Ready = new Promise<void>(resolve => {
            worker.onmessage = ev => {
                //project is initialized -> switch to normal message handling
                worker.onmessage = handleMessage

                //ev contains the initial state -> patch
                const state = ev.data as SceneInitializedEvent
                controller.#currentFrame = state.currentFrame
                controller.#isPlaying = state.isPlaying
                controller.#isStatic = state.isStatic
                controller.#speedRatio = state.speedRatio
                controller.#isGridEnabled = state.isGridEnabled

                //resolve promise
                resolve()
            }
            const offscreen = canvas.transferControlToOffscreen()
            worker.postMessage({
                project: serialized,
                canvas: offscreen
            }, [offscreen, serialized])
        })
    }

    get currentFrame(): number {
        return this.#currentFrame
    }
    get isPlaying(): boolean {
        return this.#isPlaying
    }
    get isStatic(): boolean {
        return this.#isStatic
    }
    get speedRatio(): number {
        return this.#speedRatio
    }
    set speedRatio(value: number) {
        this.#speedRatio = value
        this.#worker.postMessage({
            type: 'setSpeedRatio',
            value: value
        } as SetSpeedRatioCommand)
    }
    play(loop: boolean): void {
        this.#isPlaying = true
        this.#worker.postMessage({
            type: 'play'
        } as PlayCommand)
    }
    pause(): void {
        this.#isPlaying = false
        this.#worker.postMessage({
            type: 'pause'
        } as PauseCommand)
    }
    goToFrame(frame: number): void {
        this.#worker.postMessage({
            type: 'goToFrame',
            frame: frame
        } as GoToFrameCommand)
    }
    registerOnFrameChanged(callback: (currentFrame: number) => void): void {
        this.#onFrameChangedCallbacks.push(callback)
    }
    registerOnAnimationLoop(callback: () => void): void {
        this.#onAnimationLoopCallbacks.push(callback)
    }
    resetCamera(): void {
        this.#worker.postMessage({
            type: 'resetCamera'
        } as ResetCameraCommand)
    }
    select(id: number): void {
        this.#worker.postMessage({
            type: 'select',
            id: id
        } as SelectCommand)
    }
    setGroupEnabled(group: string, enabled: boolean): void {
        this.#worker.postMessage({
            type: 'setGroupEnabled',
            group: group,
            enabled: enabled
        } as SetGroupEnabledCommand)
    }
    setPathEnabled(id: number, enabled: boolean, color: string): void {
        this.#worker.postMessage({
            type: 'setPathEnabled',
            id: id,
            enabled: enabled,
            color: color
        } as SetPathEnabledCommand)
    }
    registerOnObjectPicked(callback: (objectId: number) => void): void {
        this.#onObjectPickedCallbacks.push(callback)
    }
    get isGridEnabled(): boolean {
        return this.#isGridEnabled
    }
    setGridEnabled(enabled: boolean): void {
        this.#isGridEnabled = enabled
        this.#worker.postMessage({
            type: 'setGridEnabled',
            enabled: enabled
        } as SetGridEnabledCommand)
    }
    resize(width: number, height: number): void {
        this.#worker.postMessage({
            type: 'resize',
            width: width,
            height: height
        } as ResizeCommand)
    }
    updateTheme(): void {
        //throw new Error("Method not implemented.");
    }
    dispose(): void {
        //TODO: send dispose command to worker for scene clean up
        this.#worker.terminate()
    }
    screenshot(): void {
        this.#worker.postMessage({
            type: 'screenshot'
        } as ScreenshotCommand)
    }
}
