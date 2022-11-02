import "@babylonjs/core/Culling/ray";

import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Engine } from "@babylonjs/core/Engines/engine";
import { PointerEventTypes, PointerInfoPre } from "@babylonjs/core/Events/pointerEvents";
import { PointerInput } from "@babylonjs/core/DeviceInput/InputDevices/deviceEnums";
import { Quaternion, Vector3 } from "@babylonjs/core/Maths/math.vector";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";

import { Project } from "../../model/project";
import { takeScreenshot } from "../../util/screenshot";
import { buildScene, SceneContainer } from "../build";
import { isMetadata } from "../objects/tools";
import { Theme } from "../theme";
import { SceneController } from "./controller";

export class LocalController implements SceneController {
    #canvas: HTMLCanvasElement|OffscreenCanvas;
    #engine: Engine;
    #container: SceneContainer|null = null;

    #stageMeshes: AbstractMesh[] = [];
    
    #defaultCameraPosition: Vector3 = Vector3.Zero();
    #defaultCameraTarget: Vector3 = Vector3.Zero();

    //callbacks
    #onAnimationLoopCallbacks: Array<() => void> = [];
    #onFrameChangedCallbacks: Array<(currentFrame: number) => void> = [];
    #onObjectPickedCallbacks: Array<(id: number|null) => void> = [];
    
    screenshotFilename = "";
    
    constructor(canvas: HTMLCanvasElement|OffscreenCanvas) {
        this.#canvas = canvas;
        //create engine
        this.#engine = new Engine(canvas, true, {
            preserveDrawingBuffer: true
        });
    }

    load(project: Project): void {
        //remove previous scene
        if (this.#container) {
            this.#container.indicatorLayer.dispose();
            this.#container.scene.dispose();
        }

        //create scene
        this.#container = buildScene(project, this.#engine);
        //changing cursors brake on offscreen canvas
        //since we dont do that anyway, disable it
        this.#container.scene.doNotHandleCursors = true;

        //save default camera position
        this.#defaultCameraPosition = this.#container.camera.position.clone();
        this.#defaultCameraTarget = this.#container.camera.target.clone();

        //hook up callbacks
        this.#container.onAnimationTick.add(this.#notifyAnimationTick.bind(this));
        this.#container.animation.onAnimationGroupLoopObservable.add(
            this.#notifyAnimationLoop.bind(this));   

        //create file name for screenshots
        this.screenshotFilename = (project.meta?.name ?? 'Screenshot') + '.png';
    }

    loadStage(url: string): void {
        if (!this.#container)
            return;
        
        //Remove previous stage
        this.removeStage();
        
        //The loader is a bit heavy, so only load the code if needed

        const scene = this.#container.scene;
        import("@babylonjs/core/Loading/sceneLoader").then(async Loader => {
            //load glb
            await import("@babylonjs/loaders/glTF");

            Loader.SceneLoader.ImportMeshAsync('', url, undefined, scene, undefined, ".glb")
            .then(v => this.#stageMeshes = v.meshes);
        });
    }
    removeStage(): void {
        for (const mesh of this.#stageMeshes) {
            mesh.dispose();
        }
        this.#stageMeshes = [];
    }

    /******************************* Callbacks ********************************/

    #notifyAnimationTick(e: {currentFrame: number}) {
        this.#onFrameChangedCallbacks.forEach(
            callback => callback(e.currentFrame));
    }
    #notifyAnimationLoop() {
        this.#onAnimationLoopCallbacks.forEach(callback => callback());
    }
    #notifyObjectPicked(objectId: number|null) {
        this.#onObjectPickedCallbacks.forEach(callback => callback(objectId));
    }

    /**************************** Animation Control ***************************/

    get currentFrame(): number {
        return this.#container?.animation.animatables[0].masterFrame ?? 0.0;
    }
    get isStatic(): boolean {
        return this.#container?.isStatic ?? true;
    }
    get isPlaying(): boolean {
        return this.#container?.animation.isPlaying ?? false;
    }
    get speedRatio(): number {
        return this.#container?.animation.speedRatio ?? 1.0;
    }
    set speedRatio(value: number) {
        if (!this.#container)
            return;
        this.#container.animation.speedRatio = value;
    }
    play() {
        this.#container?.animation.play(true);
    }
    pause() {
        this.#container?.animation.pause();
    }
    goToFrame(frame: number) {
        this.#container?.animation.goToFrame(frame);
    }

    registerOnFrameChanged(callback: (currentFrame: number) => void): void {
        this.#onFrameChangedCallbacks.push(callback);
    }
    registerOnAnimationLoop(callback: () => void): void {
        this.#onAnimationLoopCallbacks.push(callback);
    }

    /*************************** Scene Interaction ****************************/

    select(id: number|null) {
        if (id != null) {
            const mesh = this.#container?.scene.getMeshByUniqueId(id);
            if (mesh && mesh.metadata && isMetadata(mesh.metadata)) {
                this.#container?.description.showDescription(
                    mesh, mesh.metadata.name, mesh.metadata.description);
            }
        }
        this.#notifyObjectPicked(id);
    }
    target(id: number): void {
        if (!this.#container)
            return;
        
        const mesh = this.#container.scene.getMeshByUniqueId(id);
        if (mesh) {
            const cam = this.#container.camera;
            const d = mesh.position.subtract(cam.target);
            cam.setTarget(mesh.position);
            cam.setPosition(cam.position.add(d));
        }
    }
    setGroupEnabled(group: string, enabled: boolean) {
        this.#container?.groupMap.get(group)?.setEnabled(enabled);
    }
    setPathEnabled(id: number, enabled: boolean, color: string): void {
        this.#container?.pathVisualizer.setPathEnabled(id, enabled, color);
    }
    resetCamera() {
        this.#container?.camera.setPosition(this.#defaultCameraPosition);
        this.#container?.camera.setTarget(this.#defaultCameraTarget);
    }

    registerOnObjectPicked(callback: (objectId: number|null) => void): void {
        this.#onObjectPickedCallbacks.push(callback);
    }

    /****************************** User Input ********************************/

    simulatePointerDown(x: number, y: number) {
        if (!this.#container)
            return;
        //gui interaction
        this.#container.overlayTexture.pick(x, y,
            new PointerInfoPre(PointerEventTypes.POINTERDOWN, {
                type: 'pointerdown',
                target: {},
                preventDefault: () => undefined,
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
            }, x, y));
    }

    simulatePointerUp(x: number, y: number) {
        if (!this.#container)
            return;
        //mesh selection
        const pick = this.#container.scene.pick(x, y);
        if (!!pick && pick.hit && !!pick.pickedMesh) {
            const id = pick.pickedMesh.uniqueId;
            this.select(id);
        }
        //gui interaction
        this.#container.overlayTexture.pick(x, y,
            new PointerInfoPre(PointerEventTypes.POINTERUP, {
                type: 'pointerup',
                target: {},
                preventDefault: () => undefined,
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
            }, x, y));
    }

    simulatePointerMove(x: number, y: number) {
        if (!this.#container)
            return;
        //gui interaction
        this.#container.overlayTexture.pick(x, y,
            new PointerInfoPre(PointerEventTypes.POINTERMOVE, {
                type: 'pointermove',
                target: {},
                preventDefault: () => undefined,
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
            }, x, y));
    }

    /**************************** Camera Control ******************************/

    //variables needed for camera
    #cameraNormal = Vector3.One();
    #quat = Quaternion.Zero();
    #delta = Vector3.Zero();

    /**
     * Pans the camera relative to the screen surface
     * @param dx Horizontal distance
     * @param dy Vertical distance
     */
     panCamera(dx: number, dy: number) {
        if (!this.#container)
            return;
        //calculate normal
        const cam = this.#container.camera;
        cam.target.subtractToRef(cam.position, this.#cameraNormal);
        const scale = this.#cameraNormal.length();
        
        //normalize distances
        dx = -dx / this.#engine.getRenderWidth() * scale;
        dy = dy / this.#engine.getRenderHeight() * scale;
        
        //create delta
        this.#delta.copyFromFloats(dx, dy, 0);
        //rotate according to camera normal
        cam.getViewMatrix().decompose(undefined, this.#quat, undefined, undefined);
        this.#quat.invertInPlace();
        this.#delta.applyRotationQuaternionInPlace(this.#quat);

        //pan camera
        cam.setTarget(cam.target.add(this.#delta));
        cam.setPosition(cam.position.add(this.#delta));
     }
     /**
      * Rotates the camera around the current target relative to current
      * orientation
      * @param alpha horizontal rotation
      * @param beta vertical rotation
      */
     rotateCamera(alpha: number, beta: number) {
        if (!this.#container)
            return;
        //update
        alpha += this.#container.camera.alpha;
        beta += this.#container.camera.beta;

        //clip
        alpha %= 2*Math.PI;
        beta %= Math.PI;

        //assign
        this.#container.camera.alpha = alpha;
        this.#container.camera.beta = beta;
     }
 
     /**
      * Zooms the camera either in or out depending on the sign of delta
      * @param delta Amount to zoom
      */
     zoomCamera(delta: number) {
        if (!this.#container)
            return;
        this.#container.camera.radius += delta;
     }
 
     /**
      * Sets the camera target, i.e. origin of rotation
      * @param x 
      * @param y 
      * @param z 
      */
     setCameraTarget(x: number, y: number, z: number) {
        if (!this.#container)
            return;
        this.#container.camera.setTarget(new Vector3(x, y, z));
     }
 
     /**
      * Sets the camera rotation
      * @param alpha 
      * @param beta 
      */
     setCameraRotation(alpha: number, beta: number) {
        if (!this.#container)
            return;
        this.#container.camera.alpha = alpha;
        this.#container.camera.beta = beta;
     }
 
     /**
      * Sets the camera zoom
      * @param distance 
      */
     setCameraZoom(distance: number) {
        if (!this.#container)
            return;
        this.#container.camera.radius = distance;
     }

    /****************************** Appearance ********************************/

    get isGridEnabled(): boolean {
        return this.#container?.grid.isEnabled() ?? false;
    }
    setGridEnabled(enabled: boolean): void {
        this.#container?.grid.setEnabled(enabled);
    }

    resize(width: number, height: number): void {
        this.#canvas.width = width;
        this.#canvas.height = height;
        this.#engine.resize(true);
    }

    setTheme(theme: Theme): void {
        if (!this.#container)
            return;
        this.#container.overlayRoot.color = theme.fontColor;
        this.#container.scene.clearColor = Color4.FromColor3(
            Color3.FromHexString(theme.clearColor), 1.0);
    }

    /********************************* Other **********************************/

    dispose(): void {
        this.#engine.dispose();
    }

    screenshot() {
        if (this.#canvas instanceof HTMLCanvasElement)
            takeScreenshot(this.#canvas, this.screenshotFilename);
    }
}
