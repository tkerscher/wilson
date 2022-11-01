import { SceneController } from "../controller/controller";
import { Theme } from "../theme";
import { SceneCommandBus } from "./commandBus";
import { SceneEventBus } from "./eventBus";

export class ControllerAdapter {
    //command messages
    #resetCamera: () => void
    #toggleGrid: () => void
    #screenshot: () => void
    #selectObject: (id: number|null) => void
    #setGroupEnabled: (e: {group: string, enabled: boolean}) => void
    #setPathEnabled: (e: {id: number, enabled: boolean, color: string}) => void
    #setTheme: (theme: Theme) => void

    constructor(controller: SceneController) {
        //create handlers
        this.#resetCamera = () => controller.resetCamera()
        this.#toggleGrid = () => controller.setGridEnabled(!controller.isGridEnabled)
        this.#screenshot = () => controller.screenshot()
        this.#selectObject = (id: number|null) => controller.select(id)
        this.#setGroupEnabled = (e: {group: string, enabled: boolean}) =>
            controller.setGroupEnabled(e.group, e.enabled)
        this.#setPathEnabled = (e: {id: number, enabled: boolean, color: string}) =>
            controller.setPathEnabled(e.id, e.enabled, e.color)
        this.#setTheme = (theme: Theme) => controller.setTheme(theme)

        //register handlers
        SceneCommandBus.on('ResetCamera', this.#resetCamera)
        SceneCommandBus.on('ToggleGrid', this.#toggleGrid)
        SceneCommandBus.on('Screenshot', this.#screenshot)
        SceneCommandBus.on('SelectObject', this.#selectObject)
        SceneCommandBus.on('SetGroupEnabled', this.#setGroupEnabled)
        SceneCommandBus.on('SetPathEnabled', this.#setPathEnabled)
        SceneCommandBus.on('SetTheme', this.#setTheme)

        //register events
        controller.registerOnObjectPicked((id: number|null) => 
            SceneEventBus.emit('ObjectPicked', id))
    }

    dispose() {
        //deregister handlers
        SceneCommandBus.off('ResetCamera', this.#resetCamera)
        SceneCommandBus.off('ToggleGrid', this.#toggleGrid)
        SceneCommandBus.off('Screenshot', this.#screenshot)
        SceneCommandBus.off('SelectObject', this.#selectObject)
        SceneCommandBus.off('SetGroupEnabled', this.#setGroupEnabled)
        SceneCommandBus.off('SetPathEnabled', this.#setPathEnabled)
        SceneCommandBus.off('SetTheme', this.#setTheme)
    }
}
