import { Color } from "../model/color";
import { ColorMap } from "../model/colormap";

/**
 * Retrieves the color associated to the given value by the color map by
 * interpolating between its color stops. If color map is undefined, black
 * is returned instead.
 * @param colormap The color map to retrieve the colors from
 * @param value The interpolated color
 * @returns The interpolated color according to the color map
 */
export function interpolateColormap(colormap: ColorMap|undefined, value: number): Color {
    if (!colormap || colormap.stops.length == 0) {
        return { r: 0, g: 0, b: 0, a: 1 };
    }

    //get first stop after scalar
    const stopIdx = colormap.stops.findIndex(s => s.value > value);
    if (stopIdx == -1) {
        //Clamp top
        const clr = colormap.stops[colormap.stops.length - 1].color;
        return clr ?? { r: 0, g: 0, b: 0, a: 1 };
    }
    if (stopIdx == 0) {
        //clamp bottom
        const clr = colormap.stops[0].color;
        return clr ?? { r: 0, g: 0, b: 0, a: 1 };
    }

    //linear interpolate between stops
    const before = colormap.stops[stopIdx - 1];
    const after = colormap.stops[stopIdx];
    if (!before.color || !after.color) {
        return { r: 0, g: 0, b: 0, a: 1 };
    }
    const lambda = (value - before.value) / (after.value - before.value);
    const red = before.color.r + (after.color.r - before.color.r) * lambda;
    const green = before.color.g + (after.color.g - before.color.g) * lambda;
    const blue = before.color.b + (after.color.b - before.color.b) * lambda;
    const alpha = before.color.a + (after.color.a - before.color.a) * lambda;
    return { r: red, g: green, b: blue, a: alpha };
}
