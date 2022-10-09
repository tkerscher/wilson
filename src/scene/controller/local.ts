import {
    Axis,
    Color3,
    Color4,
    Engine,
    PointerEventTypes,
    PointerInfoPre,
    PointerInput,
    Quaternion,
    Tools,
    Vector3
} from "@babylonjs/core";
import { Control } from "@babylonjs/gui";
import { Project } from "../../model/project";
import { buildScene, SceneContainer } from "../build";
import { isMetadata } from "../objects/tools";
import { Theme } from "../theme";
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

    /**************************** Camera Control ******************************/

    //variables needed for camera
    #cameraNormal = Vector3.One()
    #quat = Quaternion.Zero()
    #delta = Vector3.Zero()

    /**
     * Pans the camera relative to the screen surface
     * @param dx Horizontal distance
     * @param dy Vertical distance
     */
     panCamera(dx: number, dy: number) {
        //calculate normal
        const cam = this.#container.camera
        cam.target.subtractToRef(cam.position, this.#cameraNormal)
        const scale = this.#cameraNormal.length()
        
        //normalize distances
        dx = -dx / this.#engine.getRenderWidth() * scale
        dy = -dy / this.#engine.getRenderHeight() * scale
        
        //create delta
        this.#delta.copyFromFloats(dx, dy, 0)
        //rotate according to camera normal
        cam.getViewMatrix().decompose(undefined, this.#quat, undefined, undefined)
        this.#delta.applyRotationQuaternionInPlace(this.#quat)

        //pan camera
        cam.setTarget(cam.target.add(this.#delta))
        cam.setPosition(cam.position.add(this.#delta))
     }
     /**
      * Rotates the camera around the current target relative to current
      * orientation
      * @param alpha horizontal rotation
      * @param beta vertical rotation
      */
     rotateCamera(alpha: number, beta: number) {
        //update
        alpha += this.#container.camera.alpha
        beta += this.#container.camera.beta

        //clip
        alpha %= 2*Math.PI
        beta %= Math.PI

        //assign
        this.#container.camera.alpha = alpha
        this.#container.camera.beta = beta
     }
 
     /**
      * Zooms the camera either in or out depending on the sign of delta
      * @param delta Amount to zoom
      */
     zoomCamera(delta: number) {
        this.#container.camera.radius += delta
     }
 
     /**
      * Sets the camera target, i.e. origin of rotation
      * @param x 
      * @param y 
      * @param z 
      */
     setCameraTarget(x: number, y: number, z: number) {
        this.#container.camera.setTarget(new Vector3(x, y, z))
     }
 
     /**
      * Sets the camera rotation
      * @param alpha 
      * @param beta 
      */
     setCameraRotation(alpha: number, beta: number) {
        this.#container.camera.alpha = alpha
        this.#container.camera.beta = beta
     }
 
     /**
      * Sets the camera zoom
      * @param distance 
      */
     setCameraZoom(distance: number) {
        this.#container.camera.radius = distance
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

    setTheme(theme: Theme): void {
        this.#container.overlayRoot.color = theme.fontColor
        this.#container.scene.clearColor = Color4.FromColor3(
            Color3.FromHexString(theme.clearColor), 1.0)
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
