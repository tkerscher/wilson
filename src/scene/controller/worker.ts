import { Project } from "../../model/project";
import { WorkerCommand } from "../worker/command";
import { SceneInitializedEvent, WorkerEvent } from "../worker/event";
import { SceneController } from "./controller";

import SceneWorker from "../worker/script?worker"
import { Theme } from "../theme";
import { takeScreenshot } from "../../util/screenshot";

export function isWorkerAvailable(): boolean {
    //Check if it's safe to use web worker
    //In Debug mode, only Chrome supports imports in web worker scripts (which we use)
    //While they compiled away in production, in debug we can only use chrome with web worker
    //TODO: It seems currently firefox struggles with babylon js in worker due to references to
    //      document (which is not available in web workers). Strangely, it works in chrome though
    return !!window.Worker &&
        !!HTMLCanvasElement.prototype.transferControlToOffscreen &&
        // @ts-ignore (window.chrome)
        !!window.chrome
}

export class WorkerController implements SceneController {
    #canvas: HTMLCanvasElement
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

    screenshotFilename: string = ""

    constructor(canvas: HTMLCanvasElement) {
        this.#canvas = canvas
        //create scene worker
        const worker = new SceneWorker()
        this.#worker = worker

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
                console.log('picked')
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
                canvas: offscreen
            }, [offscreen])
        })        
    }

    #sendCommand(cmd: WorkerCommand, transfer?: Transferable[]) {
        this.#worker.postMessage(cmd, transfer)
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
    load(project: Project): void {
        const serialized = Project.encode(project).finish().buffer
        this.#sendCommand({
            type: 'load',
            data: serialized
        }, [serialized])
        this.screenshotFilename = (project.meta?.name ?? 'Screenshot') + '.png'
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
        takeScreenshot(this.#canvas, this.screenshotFilename)
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
