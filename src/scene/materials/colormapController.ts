import { Observable } from "@babylonjs/core/Misc/observable";
import { RawTexture } from "@babylonjs/core/Materials/Textures/rawTexture";
import { Scene } from "@babylonjs/core/scene";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";

import { ColorMap } from "../../model/colormap";
import { interpolateColormap } from "../../interpolation/colormap";

const TEXTURE_SIZE = 1024;

/**
 * Class for controlling the shader resources needed for color map lookup and
 * notifying about changes on them.
 */
export class ColorMapController {
    #texture: RawTexture;
    #minScalar: number;
    #maxScalar: number;

    #onMinScalarChanged = new Observable<number>();
    #onMaxScalarChanged = new Observable<number>();

    constructor(scene: Scene, colormap?: ColorMap) {
        if (!colormap || colormap.stops.length <= 1) {
            //min max cant be equal, otherwise the shader crashes
            this.#minScalar = 0.0;
            this.#maxScalar = 1.0;
        }
        else {
            this.#minScalar = colormap.stops[0].value;
            this.#maxScalar = colormap.stops[colormap.stops.length - 1].value;
            this.#sanitizeRange();
        }

        this.#texture = createTexture(scene, colormap);
        this.#texture.coordinatesMode = Texture.EQUIRECTANGULAR_MODE;
    }

    /**
     * The texture holding the colormap.
     */
    get texture(): Texture { return this.#texture; }

    /**
     * Gets or sets the minimum value of the colormap range.
     */
    get minScalar(): number { return this.#minScalar; }
    set minScalar(value: number) {
        this.#minScalar = value;
        this.#sanitizeRange();
        this.#onMinScalarChanged.notifyObservers(value);
    }
    /**
     * Gets or sets the maximum value of the colormap range.
     */
    get maxScalar(): number { return this.#maxScalar; }
    set maxScalar(value: number) {
        this.#maxScalar = value;
        this.#sanitizeRange();
        this.#onMaxScalarChanged.notifyObservers(value);
    }
    /**
     * Gers the Observable notifying on changes of the minScalar.
     */
    get onMinScalarChanged() { return this.#onMinScalarChanged; }
    /**
     * Gets the Observable notifying on changes of the maxScalar.
     */
    get onMaxScalarChanged() { return this.#onMaxScalarChanged; }

    /**
     * Ensures that min and max are not the same to prevent division by zero
     * errors.
     */
    #sanitizeRange() {
        if (this.#minScalar == this.#maxScalar) {
            this.#maxScalar += 1e-7; //float epsilon
        }
    }
}

function createTexture(scene: Scene, colormap?: ColorMap): RawTexture {
    if (!colormap || colormap.stops.length == 0) {
        //create default colormap if none is provided (solid black)
        const data = new Uint8Array([0, 0, 0, 255]);
        return RawTexture.CreateRGBATexture(data, 1, 1, scene);
    }
    else if (colormap.stops.length == 1) {
        //create single color texture
        const color = colormap.stops[0].color;
        const data = new Uint8Array([
            (color?.r ?? 0) * 255,
            (color?.g ?? 0) * 255,
            (color?.b ?? 0) * 255,
            (color?.a ?? 0) * 255
        ]);
        return RawTexture.CreateRGBATexture(data, 1, 1, scene);
    }
    else {
        //build color map texture
        const start = colormap.stops[0].value;
        const end = colormap.stops[colormap.stops.length - 1].value;
        const period = end - start;
        const data = new Uint8Array(function*() {
            //Interpolate to guarantee uniform steps in texture
            for (let i = 0; i < TEXTURE_SIZE; ++i) {
                const t = i / TEXTURE_SIZE * period + start;
                const c = interpolateColormap(colormap, t);

                yield c.r * 255;
                yield c.g * 255;
                yield c.b * 255;
                yield c.a * 255;
            }
        }());
        return RawTexture.CreateRGBATexture(data,
            TEXTURE_SIZE, 1, scene, false, false);
    }
}
