import { KeyMap } from "./keyMap"

//Speed settings
const SpeedStepSmall = 1.0
const SpeedStepMedium = 10.0
const SpeedStepLarge = 50.0

export interface Player {
    togglePlaying(): void
    backward(): void
    forward(): void
    toggleLooping(): void

    adjustSpeed(delta: number): void
}

export class PlayerControl {
    #handlerOnce: (e: KeyboardEvent) => void
    #handlerRepeat: (e: KeyboardEvent) => void

    constructor(p: Player) {
        //create hotkeys
        const hotKeysOnce = new KeyMap([
            //play / pause
            ["Space", () => p.togglePlaying()],
            ["KeyK", () => p.togglePlaying()],
            ["KeyJ", () => p.backward()],
            ["KeyL", () => p.forward()],
            ["KeyM", () => p.toggleLooping()],
        ])
        const hotKeysRepeat = new KeyMap([
            //speed
            ["NumpadAdd", () => p.adjustSpeed(SpeedStepMedium)],
            ["Shift+NumpadAdd", () => p.adjustSpeed(SpeedStepLarge)],
            ["Alt+NumpadAdd", () => p.adjustSpeed(SpeedStepSmall)],
            ["NumpadSubtract", () => p.adjustSpeed(-SpeedStepMedium)],
            ["Shift+NumpadSubtract", () => p.adjustSpeed(-SpeedStepLarge)],
            ["Alt+NumpadSubtract", () => p.adjustSpeed(-SpeedStepSmall)],
        ])

        //create handler
        this.#handlerRepeat = e => hotKeysRepeat.exec(e)
        this.#handlerOnce = e => {
            if (!e.repeat)
                hotKeysOnce.exec(e)
        }

        //register handler
        document.addEventListener('keydown', this.#handlerRepeat)
        document.addEventListener('keydown', this.#handlerOnce)
    }

    dispose() {
        document.removeEventListener('keydown', this.#handlerOnce)
        document.removeEventListener('keydown', this.#handlerRepeat)

        this.#handlerOnce = () => {}
        this.#handlerRepeat = () => {}
    }
}
