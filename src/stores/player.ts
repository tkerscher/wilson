import { defineStore } from 'pinia'

export const usePlayer = defineStore('player', {
    state: () => ({
        currentFrame: 0.0,
        startFrame: 0.0,
        endFrame: 100.0,

        speedRatio: 1.0,
        stepSize: 1.0,

        isCameraLocked: false,
        isFullscreen: false,
        isLooping: false,
        isPlaying: false
    }),
    actions: {
        //TODO: Convert stepSize (seconds) to framecount via speedRatio
        forward() {
            if (this.endFrame - this.currentFrame > this.stepSize) {
                this.currentFrame += this.stepSize
            }
            else {
                this.currentFrame = this.endFrame
            }
        },
        backward() {
            if (this.currentFrame - this.startFrame > this.stepSize) {
                this.currentFrame -= this.stepSize
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
