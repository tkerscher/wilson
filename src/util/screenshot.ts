import { createDownload } from "./download";

/**
 * Takes a screenshot of the current content of the given canvas and starts a
 * download with the provided file name.
 * @param canvas Canvas to take screenshot from
 * @param filename Name of the screenshot
 */
export function takeScreenshot(canvas: HTMLCanvasElement, filename = 'Screenshot.png') {
    canvas.toBlob(blob => {
        if (!blob)
            return;
        createDownload(blob, filename);
    });
}
