import {
    Color3,
    Color4,
    Engine,
    PointerEventTypes,
    PointerInfoPre,
    PointerInput,
    Tools,
    Vector3
} from "@babylonjs/core";
import { Control } from "@babylonjs/gui";
import { Project } from "../../model/project";
import { buildScene, SceneContainer } from "../build";
import { isMetadata } from "../objects/tools";
import { SceneController } from "./controller";

export class LocalController implements SceneController {
    #canvas: HTMLCanvasElement|OffscreenCanvas
    #container: SceneContainer
    #engine: Engine

    #allowInput: boolean

    #defaultCameraPosition: Vector3
    #defaultCameraTarget: Vector3
    
    constructor(project: Project, canvas: HTMLCanvasElement|OffscreenCanvas, allowInput: boolean = false) {
        this.#allowInput = allowInput
        this.#canvas = canvas
        //create engine
        this.#engine = new Engine(canvas, true, {
            preserveDrawingBuffer: true
        })
        //create scene
        this.#container = buildScene(project, this.#engine)
        //changing cursors brake on offscreen canvas
        //since we dont do that anyway, disable it
        this.#container.scene.doNotHandleCursors = true
        //apply theme
        this.updateTheme()

        //save default camera position
        this.#defaultCameraPosition = this.#container.camera.position.clone()
        this.#defaultCameraTarget = this.#container.camera.target.clone()
    }

    /**************************** Animation Control ***************************/

    get currentFrame(): number {
        return this.#container.animation.animatables[0].masterFrame
    }
    get isStatic(): boolean {
        return this.#container.isStatic
    }
    get isPlaying(): boolean {
        return this.#container.animation.isPlaying
    }
    get speedRatio(): number {
        return this.#container.animation.speedRatio
    }
    set speedRatio(value: number) {
        this.#container.animation.speedRatio = value
    }
    play(loop: boolean) {
        this.#container.animation.play(loop)
    }
    pause() {
        this.#container.animation.pause()
    }
    goToFrame(frame: number) {
        this.#container.animation.goToFrame(frame)
    }

    registerOnFrameChanged(callback: (currentFrame: number) => void): void {
        this.#container.onAnimationTick.add(e => callback(e.currentFrame))
    }
    registerOnAnimationLoop(callback: () => void): void {
        this.#container.animation.onAnimationGroupLoopObservable.add(callback)
    }

    /*************************** Scene Interaction ****************************/

    select(id: number|null) {
        if (id != null) {
            const mesh = this.#container.scene.getMeshByUniqueId(id)
            if (mesh && mesh.metadata && isMetadata(mesh.metadata)) {
                this.#container.description.showDescription(
                    mesh, mesh.metadata.name, mesh.metadata.description)
            }
        }
    }
    setGroupEnabled(group: string, enabled: boolean) {
        this.#container.groupMap.get(group)?.setEnabled(enabled)
    }
    setPathEnabled(id: number, enabled: boolean, color: string): void {
        this.#container.pathVisualizer.setPathEnabled(id, enabled, color)
    }
    resetCamera() {
        this.#container.camera.setPosition(this.#defaultCameraPosition)
        this.#container.camera.setTarget(this.#defaultCameraTarget)
    }

    registerOnObjectPicked(callback: (objectId: number) => void): void {
        this.#container.onObjectPicked.add(e => callback(e.objectId))
    }

    /****************************** User Input ********************************/

    //TODO: It seems web workers do not support creation of pointer events, which
    //      babylon js needs for simulating events. For now, we simulate only
    //      the gui texture and hardcode the mesh selection.

    simulatePointerDown(x: number, y: number) {
        if (this.#allowInput) {
            //gui interaction
            this.#container.overlayTexture.pick(x, y,
                new PointerInfoPre(PointerEventTypes.POINTERDOWN, {
                    type: 'pointerdown',
                    target: {},
                    preventDefault: () => {},
                    inputIndex: PointerInput.LeftClick,
                    altKey: false,
                    button: 0,
                    buttons: 1,
                    clientX: x,
                    clientY: y,
                    ctrlKey: false,
                    metaKey: false,
                    movementX: 0,
                    movementY: 0,
                    offsetX: x,
                    offsetY: y,
                    pageX: x,
                    pageY: y,
                    shiftKey: false,
                    x: x,
                    y: y
                }, x, y))
        }
    }

    simulatePointerUp(x: number, y: number) {
        if (this.#allowInput) {
            //mesh selection
            const pick = this.#container.scene.pick(x, y)
            if (!!pick && pick.hit && !!pick.pickedMesh) {
                const id = pick.pickedMesh.uniqueId
                this.select(id)
            }
            //gui interaction
            this.#container.overlayTexture.pick(x, y,
                new PointerInfoPre(PointerEventTypes.POINTERUP, {
                    type: 'pointerup',
                    target: {},
                    preventDefault: () => {},
                    inputIndex: PointerInput.LeftClick,
                    altKey: false,
                    button: 0,
                    buttons: 1,
                    clientX: x,
                    clientY: y,
                    ctrlKey: false,
                    metaKey: false,
                    movementX: 0,
                    movementY: 0,
                    offsetX: x,
                    offsetY: y,
                    pageX: x,
                    pageY: y,
                    shiftKey: false,
                    x: x,
                    y: y
                }, x, y))
        }
    }

    simulatePointerMove(x: number, y: number) {
        if (this.#allowInput) {
            //gui interaction
            this.#container.overlayTexture.pick(x, y,
                new PointerInfoPre(PointerEventTypes.POINTERMOVE, {
                    type: 'pointermove',
                    target: {},
                    preventDefault: () => {},
                    inputIndex: PointerInput.Move,
                    altKey: false,
                    button: -1,
                    buttons: 0,
                    clientX: x,
                    clientY: y,
                    ctrlKey: false,
                    metaKey: false,
                    movementX: 0,
                    movementY: 0,
                    offsetX: x,
                    offsetY: y,
                    pageX: x,
                    pageY: y,
                    shiftKey: false,
                    x: x,
                    y: y
                }, x, y))
        }
    }

    /****************************** Appearance ********************************/

    get isGridEnabled(): boolean {
        return this.#container.grid.isEnabled()
    }
    setGridEnabled(enabled: boolean): void {
        this.#container.grid.setEnabled(enabled)
    }

    resize(width: number, height: number): void {
        this.#canvas.width = width
        this.#canvas.height = height
        this.#engine.resize(true)
    }

    updateTheme() {
        // //retrieve colors from css
        // const style = getComputedStyle(document.documentElement)
        // const color = style.getPropertyValue('--scene-font-color').trim()
        // const clear = style.getPropertyValue('--scene-background').trim()
        // const grid  = style.getPropertyValue('--grid-color').trim()
        // //update colors
        // this.#container.overlayRoot.color = color
        // this.#container.scene.clearColor = Color4.FromColor3(
        //     Color3.FromHexString(clear), 1.0)
    }

    /********************************* Other **********************************/

    dispose(): void {
        this.#engine.dispose()
    }

    screenshot() {
        //TODO: return image instead of create download (default)
        Tools.CreateScreenshot(this.#engine,
            this.#container.camera, { precision: 2.0 })
    }
}
