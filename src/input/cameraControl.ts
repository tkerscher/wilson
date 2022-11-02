import { SceneController } from "../scene/controller/controller";
import { KeyMap } from "./keyMap";

//pan settings
const PanDx = 50.0;
const PanDy = 50.0;
//Rotation settings
const dAlpha = 0.05;
const dBeta = 0.05;
//zoom settings
const dZoom = 0.1;

export class CameraControl {
    #target: HTMLElement;

    #handlerOnce: (e: KeyboardEvent) => void;
    #handlerRepeat: (e: KeyboardEvent) => void;

    #onPointerDown: (e: PointerEvent) => void;
    #onPointerUp: (e: PointerEvent) => void;
    #onPointerMove: (e: PointerEvent) => void;
    #onWheel: (e: WheelEvent) => void;

    #dragging = false;

    constructor(s: SceneController, target: HTMLElement) {
        this.#target = target;

        //create key mappings
        const hotKeysOnce = new KeyMap([
            //camera fixed position
            ["KeyR", () => s.resetCamera()],
            ["Numpad1",     () => s.setCameraRotation(Math.PI / 2, Math.PI / 2)], //look in y
            ["Alt+Numpad1", () => s.setCameraRotation(-Math.PI / 2, Math.PI / 2)],//look in -y
            ["Numpad3",     () => s.setCameraRotation(0, Math.PI / 2)],           //look in x
            ["Alt+Numpad3", () => s.setCameraRotation(Math.PI, Math.PI / 2)],     //look in -x
            ["Numpad7",     () => s.setCameraRotation(0, 0)],                     //look in z
            ["Alt+Numpad7", () => s.setCameraRotation(0, Math.PI)],               //look in -z
            ["Numpad9",     () => s.rotateCamera(Math.PI, 0)],//reverse horizontal
            //alt -> no numpad
            ["Digit1",     () => s.setCameraRotation(Math.PI / 2, Math.PI / 2)], //look in y
            ["Alt+Digit1", () => s.setCameraRotation(-Math.PI / 2, Math.PI / 2)],//look in -y
            ["Digit3",     () => s.setCameraRotation(0, Math.PI / 2)],           //look in x
            ["Alt+Digit3", () => s.setCameraRotation(Math.PI, Math.PI / 2)],     //look in -x
            ["Digit7",     () => s.setCameraRotation(0, 0)],                     //look in z
            ["Alt+Digit7", () => s.setCameraRotation(0, Math.PI)],               //look in -z
            ["Digit9",     () => s.rotateCamera(Math.PI, 0)],//reverse horizontal
        ]);
        const hotKeysRepeat = new KeyMap([
            //camera rotation
            ["Numpad2", () => s.rotateCamera(0, dBeta)],  //rot down
            ["Numpad8", () => s.rotateCamera(0, -dBeta)], //rot up
            ["Numpad4", () => s.rotateCamera(-dAlpha, 0)],//rot left
            ["Numpad6", () => s.rotateCamera(dAlpha, 0)], //rot up
            //alt -> no numpad
            ["Digit2", () => s.rotateCamera(0, dBeta)],  //rot down
            ["Digit8", () => s.rotateCamera(0, -dBeta)], //rot up
            ["Digit4", () => s.rotateCamera(-dAlpha, 0)],//rot left
            ["Digit6", () => s.rotateCamera(dAlpha, 0)], //rot up

            //pan
            ["KeyW", () => s.panCamera(0, PanDy)],
            ["KeyA", () => s.panCamera(PanDx, 0)],
            ["KeyS", () => s.panCamera(0, -PanDy)],
            ["KeyD", () => s.panCamera(-PanDx, 0)],
            ["ArrowUp", () => s.panCamera(0, PanDy)],
            ["ArrowLeft", () => s.panCamera(PanDx, 0)],
            ["ArrowDown", () => s.panCamera(0, -PanDy)],
            ["ArrowRight", () => s.panCamera(-PanDx, 0)],
        ]);
        //create handler
        this.#handlerRepeat = e => hotKeysRepeat.exec(e);
        this.#handlerOnce = e => {
            if (!e.repeat)
                hotKeysOnce.exec(e);
        };

        //pointer events
        const control = this;
        this.#onPointerDown = e => {
            //Either middle mouse button or left + ctrl
            const mmb = e.button == 1 && e.buttons == 4 && !e.altKey && !e.ctrlKey;
            const lmb = e.button == 0 && e.buttons == 1 && !e.altKey && e.ctrlKey;
            if (mmb || lmb) {
                control.#dragging = true;
            }
        };
        this.#onPointerUp = () => {
            control.#dragging = false;
        };
        this.#onPointerMove = e => {
            if (control.#dragging) {
                if (e.shiftKey) {
                    s.panCamera(e.movementX, e.movementY);
                }
                else {
                    const dAlpha = -e.movementX / control.#target.clientWidth * 2 * Math.PI;
                    const dBeta = -e.movementY / control.#target.clientHeight * Math.PI;
                    s.rotateCamera(dAlpha, dBeta);
                }
            }
        };
        this.#onWheel = e => {
            s.zoomCamera(dZoom * e.deltaY);
        };

        //register handler
        document.addEventListener('keydown', this.#handlerRepeat);
        document.addEventListener('keydown', this.#handlerOnce);
        target.addEventListener('pointerdown', this.#onPointerDown);
        target.addEventListener('pointerup', this.#onPointerUp);
        target.addEventListener('pointermove', this.#onPointerMove);
        target.addEventListener('wheel', this.#onWheel);
    }

    dispose() {
        document.removeEventListener('keydown', this.#handlerOnce);
        document.removeEventListener('keydown', this.#handlerRepeat);
        this.#target.removeEventListener('pointerdown', this.#onPointerDown);
        this.#target.removeEventListener('pointerup', this.#onPointerUp);
        this.#target.removeEventListener('pointermove', this.#onPointerMove);
        this.#target.removeEventListener('wheel', this.#onWheel);

        this.#handlerOnce = () => undefined;
        this.#handlerRepeat = () => undefined;
        this.#onPointerDown = () => undefined;
        this.#onPointerUp = () => undefined;
        this.#onPointerMove = () => undefined;
        this.#onWheel = () => undefined;
    }
}