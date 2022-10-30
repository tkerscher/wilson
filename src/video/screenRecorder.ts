import { createDownload } from '../util/download'

const mime = "video/webm"
const chunkSize = 3000

export class ScreenRecorder {
    #canvas: HTMLCanvasElement
    #recorder: MediaRecorder|null = null
    #isRecording: boolean = false

    #filename: string
    #recordedChunks = [] as Blob[]

    constructor(canvas: HTMLCanvasElement, filename: string) {
        this.#canvas = canvas
        this.#filename = filename
    }

    get isRecording(): boolean {
        return this.#isRecording
    }

    start(fps: number = 30) {
        if (this.#isRecording)
            this.stop()

        const stream = this.#canvas.captureStream(fps)
        this.#recorder = new MediaRecorder(stream, { mimeType: mime })
        this.#recorder.ondataavailable = this.#handleDataAvailable.bind(this)
        this.#recorder.onerror = this.#handleError.bind(this)
        this.#recorder.onstop = this.#handleStop.bind(this)

        this.#recordedChunks = []
        this.#isRecording = true
        this.#recorder.start(chunkSize)
    }
    stop() {
        if (!this.#isRecording)
            return

        this.#isRecording = false
        this.#recorder!.stop()
    }

    #handleDataAvailable(e: BlobEvent) {
        if (e.data.size > 0)
            this.#recordedChunks.push(e.data)
    }
    #handleError(e: MediaRecorderErrorEvent) {
        this.stop()
    }
    #handleStop() {
        this.stop()
        const blob = new Blob(this.#recordedChunks)
        createDownload(blob, this.#filename)
    }
}
