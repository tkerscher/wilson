import { defineStore } from 'pinia'

const MinSpeed = 0.01
const MaxSpeed = 999.99

export const usePlayer = defineStore('player', {
    state: () => ({
        currentFrame: 0.0,
        startFrame: 0.0,
        endFrame: 100.0,

        speedRatio: 1.0,
        stepSize: 10.0,

        isFullscreen: false,
        isLooping: false,
        isPlaying: false,
        isScrubbing: false
    }),
    actions: {
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
        togglePlaying() {
            this.isPlaying = !this.isPlaying
        },
        toggleLooping() {
            this.isLooping = !this.isLooping
        },
        adjustSpeed(delta: number) {
            const _speed = this.speedRatio + delta
            this.speedRatio = _speed < MinSpeed ? MinSpeed : (_speed > MaxSpeed ? MaxSpeed : _speed)
        }
    }
})
