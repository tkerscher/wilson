import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Material } from "@babylonjs/core/Materials/material";
import { RenderTargetTexture } from "@babylonjs/core/Materials/Textures/renderTargetTexture";
import { Scene } from "@babylonjs/core/scene";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";

/**
 * Interface for making objects pickable with the
 * GpuPickingService
 */
export interface Pickable {
    /**
     * Mesh to be drawn during picking.
     */
    mesh: AbstractMesh
    /**
     * Special Material to use for rendering onto the picking texture
     */
    material?: Material
    /**
     * Prepares the object for GPU picking, i.e. swapping the color
     * with the ids.
     */
    preparePicking?(): void
    /**
     * Clean up after GPU picking, i.e. restoring the proper color.
     */
    finishPicking?(): void
}

export class GpuPickingService {
    #engine: Engine;
    #scene: Scene;
    #target: RenderTargetTexture;

    #flatMaterial: StandardMaterial;

    #scale: number;
    #preps = new Array<() => void>();
    #finish = new Array<() => void>();

    callback: (id: number) => void = () => {/**/};

    //reuse buffer to ease GC
    #buffer = new Uint8Array(4);

    // screen coords to resolve (async)
    #posX = 0;
    #posY = 0;

    constructor(engine: Engine, scene: Scene, scale = 4) {
        this.#engine = engine;
        this.#scene = scene;
        this.#target = new RenderTargetTexture(
            "gpu_picking_target", {
                width: Math.floor(engine.getRenderWidth() / scale),
                height: Math.floor(engine.getRenderHeight() / scale)
            }, scene);
        this.#target.clearColor = new Color4(0.0, 0.0, 0.0, 0.0);
        this.#target.renderList = [];

        this.#scale = scale;
        const service = this;

        //we need to ignore lighting and render everything flat to make this work
        this.#flatMaterial = new StandardMaterial("gpu_picking_mat", scene);
        this.#flatMaterial.disableLighting = true;
        this.#flatMaterial.emissiveColor = Color3.White();

        // sync resize
        engine.onResizeObservable.add(() => {
            service.#target.resize({
                width: Math.floor(engine.getRenderWidth() / scale),
                height: Math.floor(engine.getRenderHeight() / scale)
            });
        });

        // hook up render logic

        //tell pickables to prepare pick table rendering
        this.#target.onBeforeRender = () => {
            service.#preps.forEach(p => p());
        };
        //unhook after rendering to save some performance
        this.#target.onAfterRender = () => {
            // restore normal rendering
            service.#finish.forEach(f => f());
            // NOTE: We assume we're the only one on this array
            scene.customRenderTargets.pop();

            // resolve picking async
            service.#target.readPixels(
                0, 0,
                service.#buffer,
                true, false,
                service.#posX, service.#posY, 1, 1
            )?.then((pixels) => {
                // build id from bytes
                const bytes = pixels as Uint8Array;
                // check for background via alpha channel
                if (bytes[3] > 128) {
                    const id = (bytes[0] << 16) + (bytes[1] << 8) + bytes[2];
                    service.callback(id);
                }
            });
        };
    }

    // get pickables(): Pickable[] {
    //     return this.#pickables;
    // }
    // set pickables(value: Pickable[]) {
    //     this.#pickables = value;
    // }

    addPickable(pickable: Pickable) {
        if (!this.#target.renderList)
            return;

        this.#target.renderList.push(pickable.mesh);
        this.#target.setMaterialForRendering(pickable.mesh, pickable.material ?? this.#flatMaterial);
        if (pickable.preparePicking)
            this.#preps.push(pickable.preparePicking);
        if (pickable.finishPicking)
            this.#finish.push(pickable.finishPicking);
    }

    /**
     * Issues an asynchron pointer pick in the scene.
     * The result is propagated using the callback specified in constructor.
     * @param x X position to pick in screen coordinates
     * @param y Y position to pick in screen coordinates
     */
    issuePick(x: number, y: number): void {
        this.#posX = Math.floor(Math.round(x) / this.#scale);
        this.#posY = Math.floor((this.#engine.getRenderHeight() - Math.round(y)) / this.#scale);
        this.#scene.customRenderTargets.push(this.#target);
    }
}

export function numToColor(num: number): number[] {
    const r = ((num & 0xFF0000) >> 16);
    const g = ((num & 0x00FF00) >>  8);
    const b = ((num & 0x0000FF) >>  0);

    return [r / 255, g / 255, b / 255, 1.0];
}
