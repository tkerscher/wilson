import { ColorMap } from "../model/colormap";
import { interpolateColormap } from "../interpolation/colormap";

/**
 * Creates a Uint8Array containing an RGBA image of the colormap with given size
 * or of size 1 if it consists of only a single color.
 * @param colormap Colormap to render
 * @param size Size of the rendered image
 * @returns Uint8Array containing the rendered RGBA image
 */
export function renderColormap(colormap: ColorMap|undefined, size: number): Uint8Array {
    if (!colormap || colormap.stops.length == 0) {
        //create default colormap if none is provided (solid black)
        return new Uint8Array([0, 0, 0, 255]);
    }
    else if (colormap.stops.length == 1) {
        //create single color texture
        const color = colormap.stops[0].color;
        return new Uint8Array([
            (color?.r ?? 0) * 255,
            (color?.g ?? 0) * 255,
            (color?.b ?? 0) * 255,
            (color?.a ?? 0) * 255
        ]);
    }
    else {
        //build color map texture
        const start = colormap.stops[0].value;
        const end = colormap.stops[colormap.stops.length - 1].value;
        const period = end - start;
        return new Uint8Array(function*() {
            //Interpolate to guarantee uniform steps in texture
            for (let i = 0; i < size; ++i) {
                const t = i / size * period + start;
                const c = interpolateColormap(colormap, t);

                yield c.r * 255;
                yield c.g * 255;
                yield c.b * 255;
                yield c.a * 255;
            }
        }());
    }
}
