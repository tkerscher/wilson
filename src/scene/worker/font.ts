import { Engine } from "@babylonjs/core/Engines/engine";

//Babylon js creates anonymous dom elements to estimate font metrics.
//This will fail in web worker, as they have no access to document.
//We will provide an alternate version using the 2d context on an offscreen
//canvas, and provide a function to patch the engine to use our method.

let canvas: OffscreenCanvas|null = null;
let ctx: OffscreenCanvasRenderingContext2D|null = null;

interface FontOffset {
    ascent: number
    height: number
    descent: number
}

function getFontOffset(font: string): FontOffset {
    if (!canvas || !ctx) {
        canvas = new OffscreenCanvas(64,64);
        ctx = canvas.getContext('2d'); 
        if (!ctx) {
            throw Error('2D context in offscreen not available!')
        }
    }

    ctx.font = font;
    ctx.textBaseline = "alphabetic";
    const descent = ctx.measureText('Hg').actualBoundingBoxDescent;
    ctx.textBaseline = "bottom";
    const ascent = ctx.measureText('Hg').actualBoundingBoxAscent;
    return { ascent: ascent, height: ascent + descent, descent: descent };
}

export function patchEngine(engine: Engine) {
    engine.getFontOffset = getFontOffset;
}
