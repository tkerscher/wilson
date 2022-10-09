/**
 * Themes describing the colors to use in the scene
 */
export interface Theme {
    /**
     * Background color of the scene
     */
    clearColor: string
    // TODO: Make the grid material accessible
    // /**
    //  * Color of the grid
    //  */
    // gridColor: string
    /**
     * Color of the text
     */
    fontColor: string
}

export function getCurrentTheme(): Theme {
    //retrieve colors from css
    const style = getComputedStyle(document.documentElement)
    const color = style.getPropertyValue('--scene-font-color').trim()
    const clear = style.getPropertyValue('--scene-background').trim()
    const grid  = style.getPropertyValue('--grid-color').trim()

    return {
        clearColor: clear,
        fontColor: color
    }
}
