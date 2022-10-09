import { Project } from "../../model/project";
import { WorkerCommand } from "../worker/command";
import { SceneInitializedEvent, WorkerEvent } from "../worker/event";
import { SceneController } from "./controller";

import SceneWorker from "../worker/script?worker"
import { Theme } from "../theme";

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

    #sendCommand(cmd: WorkerCommand) {
        this.#worker.postMessage(cmd)
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
        this.#sendCommand({
            type: 'setSpeedRatio',
            value: value
        })
    }
    play(loop: boolean): void {
        this.#isPlaying = true
        this.#sendCommand({
            type: 'play',
            loop: true
        })
    }
    pause(): void {
        this.#isPlaying = false
        this.#sendCommand({
            type: 'pause'
        })
    }
    goToFrame(frame: number): void {
        this.#sendCommand({
            type: 'goToFrame',
            frame: frame
        })
    }
    registerOnFrameChanged(callback: (currentFrame: number) => void): void {
        this.#onFrameChangedCallbacks.push(callback)
    }
    registerOnAnimationLoop(callback: () => void): void {
        this.#onAnimationLoopCallbacks.push(callback)
    }
    resetCamera(): void {
        this.#sendCommand({
            type: 'resetCamera'
        })
    }
    select(id: number): void {
        this.#sendCommand({
            type: 'select',
            id: id
        })
    }
    setGroupEnabled(group: string, enabled: boolean): void {
        this.#sendCommand({
            type: 'setGroupEnabled',
            group: group,
            enabled: enabled
        })
    }
    setPathEnabled(id: number, enabled: boolean, color: string): void {
        this.#sendCommand({
            type: 'setPathEnabled',
            id: id,
            enabled: enabled,
            color: color
        })
    }
    registerOnObjectPicked(callback: (objectId: number) => void): void {
        this.#onObjectPickedCallbacks.push(callback)
    }
    get isGridEnabled(): boolean {
        return this.#isGridEnabled
    }
    setGridEnabled(enabled: boolean): void {
        this.#isGridEnabled = enabled
        this.#sendCommand({
            type: 'setGridEnabled',
            enabled: enabled
        })
    }
    resize(width: number, height: number): void {
        this.#sendCommand({
            type: 'resize',
            width: width,
            height: height
        })
    }
    setTheme(theme: Theme): void {
        this.#sendCommand({
            type: 'setTheme',
            theme: theme
        })
    }
    dispose(): void {
        //TODO: send dispose command to worker for scene clean up
        this.#worker.terminate()
    }
    screenshot(): void {
        this.#sendCommand({
            type: 'screenshot'
        })
    }

    simulatePointerDown(x: number, y: number): void {
        this.#sendCommand({
            type: 'pointerDown',
            x: x,
            y: y
        })
    }

    simulatePointerUp(x: number, y: number): void {
        this.#sendCommand({
            type: 'pointerUp',
            x: x,
            y: y
        })
    }

    simulatePointerMove(x: number, y: number): void {
        this.#sendCommand({
            type: 'pointermove',
            x: x,
            y: y
        })
    }

    panCamera(dx: number, dy: number): void {
        this.#sendCommand({
            type: 'panCamera',
            dx: dx,
            dy: dy
        })
    }
    rotateCamera(alpha: number, beta: number): void {
        this.#sendCommand({
            type: 'rotateCamera',
            alpha: alpha,
            beta: beta
        })
    }
    zoomCamera(delta: number): void {
        this.#sendCommand({
            type: 'zoom',
            delta: delta
        })
    }
    setCameraTarget(x: number, y: number, z: number): void {
        this.#sendCommand({
            type: 'setCameraTarget',
            x: x,
            y: y,
            z: z
        })
    }
    setCameraRotation(alpha: number, beta: number): void {
        this.#sendCommand({
            type: 'setCameraRotation',
            alpha: alpha,
            beta: beta
        })
    }
    setCameraZoom(distance: number): void {
        this.#sendCommand({
            type: 'setCameraZoom',
            distance: distance
        })
    }
}