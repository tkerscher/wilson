/**
 * Map holding hot key mappings and providing methods to execute them.
 */
export class KeyMap {
    #map: Map<string, () => void>

    constructor(keys: Iterable<readonly [string, () => void]>) {
        this.#map = new Map<string, () => void>(keys)
    }

    exec(e: KeyboardEvent) {
        //create hot key code
        let code = e.code
        if (e.ctrlKey) { code = 'Ctrl+' + code }
        if (e.shiftKey) { code = 'Shift+' + code }
        if (e.altKey) { code = 'Alt+' + code }

        //look up hotkey
        const fn = this.#map.get(code)
        if (!fn) {
            return false
        }
        else {
            fn()
            return true
        }
    }
}
