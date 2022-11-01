import mitt from "mitt"
import { Theme } from "../theme"

/**
 * Commands send to control scene.
 */
export type CommandMessages = {
    /**
     * Reset the camera
     */
    ResetCamera: void
    /**
     * Toggles the grid visibility
     */
    ToggleGrid: void
    /**
     * Issues a screenshot
     */
    Screenshot: void

    /**
     * Select an object given its id
     */
    SelectObject: number|null
    /**
     * Pans the camera to target an object specified by its id
     */
    TargetObject: number
    /**
     * Hide or shows a group of elements
     */
    SetGroupEnabled: { group: string, enabled: boolean }
    /**
     * Hide, shows or updates a path given its id and color
     */
    SetPathEnabled: { id: number, enabled: boolean, color: string }

    /**
     * Sets the current theme for the scene
     */
    SetTheme: Theme
}
export const SceneCommandBus = mitt<CommandMessages>()

export class SceneCommander {
    /**
     * Resets the camera
     */
    static ResetCamera() {
        SceneCommandBus.emit('ResetCamera')
    }
    /**
     * Toggles the grid visibility
     */
    static ToggleGrid() {
        SceneCommandBus.emit('ToggleGrid')
    }
    /**
     * Issues a screenshot
     */
    static Screenshot() {
        SceneCommandBus.emit('Screenshot')
    }

    /**
     * Select an object given its id
     */
    static SelectObject(id: number|null) {
        SceneCommandBus.emit('SelectObject', id)
    }
    /**
     * Pans the camera to target an object specified by its id
     */
    static TargetObject(id: number) {
        SceneCommandBus.emit('TargetObject', id)
    }
    /**
     * Hide or shows a group of elements
     */
    static SetGroupEnabled(group: string, enabled: boolean) {
        SceneCommandBus.emit('SetGroupEnabled', {
            group: group,
            enabled: enabled
        })
    }
    /**
     * Hide, shows or updates a path given its id and color
     */
    static SetPathEnabled(id: number, enabled: boolean, color: string) {
        SceneCommandBus.emit('SetPathEnabled', {
            id: id,
            enabled: enabled,
            color: color
        })
    }

    /**
     * Set theme
     */
    static SetTheme(theme: Theme) {
        SceneCommandBus.emit('SetTheme', theme)
    }
}