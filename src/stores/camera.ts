import { defineStore } from "pinia"

export interface CameraConfig {
    alpha: number,
    beta: number,
    radius: number,

    targetX: number,
    targetY: number,
    targetZ: number
}

export const useCamera = defineStore('camera', {
    state: () => ({
        alpha: 0.0,
        beta: 0.0,
        radius: 1.0,

        targetX: 0.0,
        targetY: 0.0,
        targetZ: 0.0,

        default: {
            alpha: 0.0,
            beta: 0.0,
            radius: 1.0,

            targetX: 0.0,
            targetY: 0.0,
            targetZ: 0.0
        }
    }),
    actions: {
        reset() {
            this.$patch(this.default)
        }
    }
})
