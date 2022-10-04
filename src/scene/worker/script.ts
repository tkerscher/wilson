import { Project } from "../../model/project"
import { LocalController } from "../controller/local"
import { WorkerCommand } from "./command"
import { AnimationLoopEvent, FrameChangedEvent, ObjectPickedEvent } from "./event"

import "./font"
var controller: LocalController

function messageHandler(ev: MessageEvent<any>) {
    //Wire up messages to controller
    const cmd = ev.data as WorkerCommand
    switch (cmd.type) {
    case 'play':
        controller.play(true)
        break
    case 'pause':
        controller.pause()
        break
    case 'goToFrame':
        controller.goToFrame(cmd.frame)
        break
    case 'resetCamera':
        controller.resetCamera()
        break
    case 'resize':
        controller.resize(cmd.width, cmd.height)
        break
    case 'screenshot':
        controller.screenshot()
        break
    case 'select':
        controller.select(cmd.id)
        break
    case 'setGridEnabled':
        controller.setGridEnabled(cmd.enabled)
        break
    case 'setGroupEnabled':
        controller.setGroupEnabled(cmd.group, cmd.enabled)
        break
    case 'setPathEnabled':
        controller.setPathEnabled(cmd.id, cmd.enabled, cmd.color)
        break
    case 'pointerDown':
        controller.simulatePointerDown(cmd.x, cmd.y)
        break
    case 'pointerUp':
        controller.simulatePointerUp(cmd.x, cmd.y)
        break
    case 'pointermove':
        controller.simulatePointerMove(cmd.x, cmd.y, 0, 0)
        break
    }
}

onmessage = ev => {
    //get data
    const canvas: OffscreenCanvas = ev.data.canvas
    const serialized: ArrayBufferLike = ev.data.project
    const data = new Uint8Array(serialized)
    const project: Project = Project.decode(data)

    //Debug
    // @ts-ignore
    canvas.style = {}

    //create scene
    controller = new LocalController(project, canvas, true)
    //register callbacks
    controller.registerOnAnimationLoop(() => postMessage({
        type: 'onAnimationLoop'
    } as AnimationLoopEvent))
    controller.registerOnFrameChanged(frame => postMessage({
        type: 'onFrameChanged',
        currentFrame: frame
    } as FrameChangedEvent))
    controller.registerOnObjectPicked(id => postMessage({
        type: 'onObjectPicked',
        objectId: id
    } as ObjectPickedEvent))

    //tell we're finished building
    postMessage('done')
    //Project is loaded -> switch to interactive message handler
    onmessage = messageHandler
}
