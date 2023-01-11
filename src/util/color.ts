import { Color } from "../model/color";
import { ColorMap } from "../model/colormap";
import { Project } from "../model/project";
import { ColorProperty } from "../model/properties";

/**
 * Translates the RGBA value encoded by color as 32bit value into hexadecimal.
 * @param color The color to translate
 * @returns The hexadecimal representation of the RGBA value
 */
export function toHex(color: Color): string {
    const hex = (x: number) => Math.round(x*255).toString(16);
    return hex(color.r) + hex(color.g) + hex(color.b) + hex(color.a);
}

/**
 * Checks, wether the given color property has any animation encoded.
 * @param project The project to retrieve referenced data from
 * @param color The color property
 * @returns True, if the color property is static and has no animations
 */
export function isStaticColor(project: Project, color: ColorProperty|undefined): boolean {
    if (!color || !color.source)
        return true;

    switch (color.source.$case) {
    case "constValue":
    case "scalarValue":
        return true;
    case "graphId":
    {
        const id = color.source.graphId;
        const graph = project.graphs.find(g => g.id == id);
        return !graph || graph.points.length <= 0;
    }}
}

/**
 * Returns the static color defined by the given property. Returns a default
 * color in case it is actually not static.
 * @param project The project to retrieve referenced data from
 * @param color The property to infer the color from
 * @returns The referenced color in RGBA [0-255]
 */
export function getStaticColor(project: Project, color: ColorProperty|undefined): Color {
    if (!color || !color.source) {
        return { r: 0, g: 0, b: 0, a: 1 }; //black
    }

    switch(color.source.$case) {
    case "constValue":
    {
        return color.source.constValue;
    }
    case "scalarValue":
    {
        return interpolateColormap(project.colormap, color.source.scalarValue);
    }
    case "graphId":
    {
        const id = color.source.graphId;
        const graph = project.graphs.find(g => g.id == id);
        if (!graph || graph.points.length != 1) {
            //Referenced graph not found or not static -> return default
            return { r: 0, g: 0, b: 0, a: 1 }; //black
        }
        else {
            const scalar = graph.points[0].value;
            return interpolateColormap(project.colormap, scalar);
        }
    }
    }
}

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
