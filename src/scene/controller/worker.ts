import { Project } from "../../model/project";
import { WorkerCommand } from "../worker/command";
import { SceneInitializedEvent, WorkerEvent } from "../worker/event";
import { SceneController } from "./controller";

import SceneWorker from "../worker/script?worker";
import { Theme } from "../theme";
import { takeScreenshot } from "../../util/screenshot";

export class WorkerController implements SceneController {
    #canvas: HTMLCanvasElement;
    //Worker related
    #worker: Worker;
    Ready: Promise<void>;

    //copy of state on host site
    #currentFrame = NaN;
    #isPlaying = true;
    #isStatic = true;
    #speedRatio = 1.0;
    #isGridEnabled = true;

    //callbacks
    #onAnimationLoopCallbacks: Array<() => void> = [];
    #onFrameChangedCallbacks: Array<(currentFrame: number) => void> = [];
    #onObjectPickedCallbacks: Array<(id: number|null) => void> = [];

    screenshotFilename = "";

    constructor(canvas: HTMLCanvasElement) {
        this.#canvas = canvas;
        //create scene worker
        const worker = new SceneWorker();
        this.#worker = worker;

        //prepare message handler
        const controller = this;
        function handleMessage(ev: MessageEvent<WorkerEvent>) {
            const event = ev.data;
            switch(event.type) {
            case "onAnimationLoop":
                controller.#onAnimationLoopCallbacks.forEach(fn => fn());
                break;
            case "onFrameChanged":
                controller.#currentFrame = event.currentFrame;
                controller.#onFrameChangedCallbacks.forEach(fn => fn(event.currentFrame));
                break;
            case "onObjectPicked":
                controller.#onObjectPickedCallbacks.forEach(fn => fn(event.objectId));
                break;
            }
        }

        //pass data to worker for init
        this.Ready = new Promise<void>(resolve => {
            worker.onmessage = ev => {
                //project is initialized -> switch to normal message handling
                worker.onmessage = handleMessage;

                //ev contains the initial state -> patch
                const state = ev.data as SceneInitializedEvent;
                controller.#currentFrame = state.currentFrame;
                controller.#isPlaying = state.isPlaying;
                controller.#isStatic = state.isStatic;
                controller.#speedRatio = state.speedRatio;
                controller.#isGridEnabled = state.isGridEnabled;

                //resolve promise
                resolve();
            };
            const offscreen = canvas.transferControlToOffscreen();
            worker.postMessage({
                canvas: offscreen
            }, [offscreen]);
        });
    }

    #sendCommand(cmd: WorkerCommand, transfer?: Transferable[]) {
        this.#worker.postMessage(cmd, transfer);
    }

    get currentFrame(): number {
        return this.#currentFrame;
    }
    get isPlaying(): boolean {
        return this.#isPlaying;
    }
    get isStatic(): boolean {
        return this.#isStatic;
    }
    get speedRatio(): number {
        return this.#speedRatio;
    }
    set speedRatio(value: number) {
        this.#speedRatio = value;
        this.#sendCommand({
            type: "setSpeedRatio",
            value: value
        });
    }
    load(project: Project): void {
        const serialized = Project.encode(project).finish().buffer;
        this.#sendCommand({
            type: "load",
            data: serialized
        }, [serialized]);
        this.screenshotFilename = (project.meta?.name ?? "Screenshot") + ".png";
    }
    loadStage(url: string): void {
        this.#sendCommand({
            type: "loadStage",
            url: url
        });
    }
    removeStage(): void {
        this.#sendCommand({
            type: "removeStage"
        });
    }
    play(): void {
        this.#isPlaying = true;
        this.#sendCommand({
            type: "play"
        });
    }
    pause(): void {
        this.#isPlaying = false;
        this.#sendCommand({
            type: "pause"
        });
    }
    goToFrame(frame: number): void {
        this.#sendCommand({
            type: "goToFrame",
            frame: frame
        });
    }
    registerOnFrameChanged(callback: (currentFrame: number) => void): void {
        this.#onFrameChangedCallbacks.push(callback);
    }
    registerOnAnimationLoop(callback: () => void): void {
        this.#onAnimationLoopCallbacks.push(callback);
    }
    resetCamera(): void {
        this.#sendCommand({
            type: "resetCamera"
        });
    }
    select(id: number): void {
        this.#sendCommand({
            type: "select",
            id: id
        });
    }
    target(id: number): void {
        this.#sendCommand({
            type: "target",
            id: id
        });
    }
    setObjectsEnabled(objectIds: number[]|null, enabled: boolean) {
        this.#sendCommand({
            type: "setObjectsEnabled",
            objectIds: objectIds,
            enabled: enabled
        });
    }
    setPathEnabled(id: number, enabled: boolean, color: string): void {
        this.#sendCommand({
            type: "setPathEnabled",
            id: id,
            enabled: enabled,
            color: color
        });
    }
    registerOnObjectPicked(callback: (objectId: number|null) => void): void {
        this.#onObjectPickedCallbacks.push(callback);
    }
    get isGridEnabled(): boolean {
        return this.#isGridEnabled;
    }
    setGridEnabled(enabled: boolean): void {
        this.#isGridEnabled = enabled;
        this.#sendCommand({
            type: "setGridEnabled",
            enabled: enabled
        });
    }
    resize(width: number, height: number): void {
        this.#sendCommand({
            type: "resize",
            width: width,
            height: height
        });
    }
    setTheme(theme: Theme): void {
        this.#sendCommand({
            type: "setTheme",
            theme: theme
        });
    }
    dispose(): void {
        //TODO: send dispose command to worker for scene clean up
        this.#worker.terminate();
    }
    screenshot(): void {
        takeScreenshot(this.#canvas, this.screenshotFilename);
    }

    simulatePointerDown(x: number, y: number): void {
        this.#sendCommand({
            type: "pointerDown",
            x: x,
            y: y
        });
    }

    simulatePointerUp(x: number, y: number): void {
        this.#sendCommand({
            type: "pointerUp",
            x: x,
            y: y
        });
    }

    simulatePointerMove(x: number, y: number): void {
        this.#sendCommand({
            type: "pointermove",
            x: x,
            y: y
        });
    }

    panCamera(dx: number, dy: number): void {
        this.#sendCommand({
            type: "panCamera",
            dx: dx,
            dy: dy
        });
    }
    rotateCamera(alpha: number, beta: number): void {
        this.#sendCommand({
            type: "rotateCamera",
            alpha: alpha,
            beta: beta
        });
    }
    zoomCamera(delta: number): void {
        this.#sendCommand({
            type: "zoom",
            delta: delta
        });
    }
    setCameraTarget(x: number, y: number, z: number): void {
        this.#sendCommand({
            type: "setCameraTarget",
            x: x,
            y: y,
            z: z
        });
    }
    setCameraRotation(alpha: number, beta: number): void {
        this.#sendCommand({
            type: "setCameraRotation",
            alpha: alpha,
            beta: beta
        });
    }
    setCameraZoom(distance: number): void {
        this.#sendCommand({
            type: "setCameraZoom",
            distance: distance
        });
    }
}
