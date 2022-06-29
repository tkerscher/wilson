import { defineStore } from 'pinia'

export const usePlayer = defineStore('player', {
    state: () => ({
        currentFrame: 0.0,
        startFrame: 0.0,
        endFrame: 100.0,

        speedRatio: 1.0,
        stepSize: 10.0,

        isCameraLocked: false,
        isFullscreen: false,
        isLooping: false,
        isPlaying: false
    }),
    actions: {
        //TODO: Convert stepSize (seconds) to framecount via speedRatio
        forward() {
            let step = this.stepSize * this.speedRatio
            if (this.endFrame - this.currentFrame > step) {
                this.currentFrame += step
            }
            else {
                this.currentFrame = this.endFrame
            }
        },
        backward() {
            let step = this.stepSize * this.speedRatio
            if (this.currentFrame - this.startFrame > step) {
                this.currentFrame -= step
            }
            else {
                this.currentFrame = this.startFrame
            }
        },
        toggleCameraLocked() {
            this.isCameraLocked = !this.isCameraLocked
        },
        toggleLooping() {
            this.isLooping = !this.isLooping
        },
        togglePlaying() {
            this.isPlaying = !this.isPlaying
        }
    }
})
