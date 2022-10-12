/**
 * Takes a screenshot of the current content of the given canvas and starts a
 * download with the provided file name.
 * @param canvas Canvas to take screenshot from
 * @param filename Name of the screenshot
 */
export function takeScreenshot(canvas: HTMLCanvasElement, filename = 'Screenshot.png') {
    canvas.toBlob(blob => {
        if (!blob)
            return

        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', filename)
        link.click()
        URL.revokeObjectURL(url)
    })
}
