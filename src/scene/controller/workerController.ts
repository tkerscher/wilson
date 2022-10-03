import { Project } from "../../model/project";
import { SceneController } from "./controller";

import SceneWorker from "./workerScript?worker"

export class WorkerController implements SceneController {
    #worker: Worker

    Ready: Promise<void>

    constructor(project: Project, canvas: OffscreenCanvas) {        
        this.#worker = new SceneWorker()
        this.Ready = new Promise<void>(resolve => {
            this.#worker.onmessage = () => {
                resolve()
            }
            this.#worker.postMessage({
                project: project,
                canvas: canvas
            })
        })
    }
    
    get currentFrame(): number {
        throw new Error("Method not implemented.");
    }
    get isPlaying(): boolean {
        throw new Error("Method not implemented.");
    }
    get isStatic(): boolean {
        throw new Error("Method not implemented.");
    }
    get speedRatio(): number {
        throw new Error("Method not implemented.");
    }
    set speedRatio(value: number) {
        throw new Error("Method not implemented.");
    }
    play(loop: boolean): void {
        throw new Error("Method not implemented.");
    }
    pause(): void {
        throw new Error("Method not implemented.");
    }
    goToFrame(frame: number): void {
        throw new Error("Method not implemented.");
    }
    registerOnFrameChanged(callback: (currentFrame: number) => void): void {
        throw new Error("Method not implemented.");
    }
    registerOnAnimationLoop(callback: () => void): void {
        throw new Error("Method not implemented.");
    }
    resetCamera(): void {
        throw new Error("Method not implemented.");
    }
    select(id: number): void {
        throw new Error("Method not implemented.");
    }
    setGroupEnabled(group: string, enabled: boolean): void {
        throw new Error("Method not implemented.");
    }
    setPathEnabled(id: number, enabled: boolean, color: string): void {
        throw new Error("Method not implemented.");
    }
    registerOnObjectPicked(callback: (objectId: number) => void): void {
        throw new Error("Method not implemented.");
    }
    get isGridEnabled(): boolean {
        throw new Error("Method not implemented.");
    }
    setGridEnabled(enabled: boolean): void {
        throw new Error("Method not implemented.");
    }
    resize(width: number, height: number): void {
        throw new Error("Method not implemented.");
    }
    updateTheme(): void {
        throw new Error("Method not implemented.");
    }
    dispose(): void {
        throw new Error("Method not implemented.");
    }
    screenshot(): void {
        throw new Error("Method not implemented.");
    }  
}
