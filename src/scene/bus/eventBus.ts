import mitt from "mitt"

/**
 * Events issued by scene
 */
export type EventMessages = {
    /**
     * Object identified by its id selected
     */
    ObjectPicked: number|null
}
export const SceneEventBus = mitt<EventMessages>()
