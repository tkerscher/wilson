import { SceneController } from "../scene/controller/controller";

/**
 * Dispatches pointer events to the scene controller.
 */
export class ScenePointerProxy {
    #canvas: HTMLCanvasElement;

    #onPointerDown: (e: PointerEvent) => void;
    #onPointerUp: (e: PointerEvent) => void;
    #onPointerMove: (e: PointerEvent) => void;

    constructor(canvas: HTMLCanvasElement, scene: SceneController) {
        this.#canvas = canvas;

        //create functions
        this.#onPointerDown = e => {
            //filter left clicks with no modifier buttons
            if (e.button == 0 && e.buttons == 1 && !e.altKey && !e.ctrlKey && !e.shiftKey)
                scene.simulatePointerDown(e.offsetX, e.offsetY);
        };
        this.#onPointerUp = e => {
            //filter no modifier buttons
            if (!e.altKey && !e.ctrlKey && !e.shiftKey)
                scene.simulatePointerUp(e.offsetX, e.offsetY);
        };
        this.#onPointerMove = e => {
            //only dispatch if a buttons is pressed
            if (e.button == -1 && !e.altKey && !e.ctrlKey && !e.shiftKey)
                scene.simulatePointerMove(e.offsetX, e.offsetY);
        };

        //register functions
        canvas.addEventListener("pointerdown", this.#onPointerDown);
        canvas.addEventListener("pointerup", this.#onPointerUp);
        canvas.addEventListener("pointermove", this.#onPointerMove);
    }

    dispose() {
        this.#canvas.removeEventListener("pointerdown", this.#onPointerDown);
        this.#canvas.removeEventListener("pointerup", this.#onPointerUp);
        this.#canvas.removeEventListener("pointermove", this.#onPointerMove);

        this.#onPointerDown = () => undefined;
        this.#onPointerUp = () => undefined;
        this.#onPointerMove = () => undefined;
    }
}
