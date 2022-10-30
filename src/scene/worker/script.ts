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
    case 'load':
        //decode project
        const serialized: ArrayBufferLike = cmd.data
        const data = new Uint8Array(serialized)
        const project: Project = Project.decode(data)
        //load it
        controller.load(project)
        break
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
    case 'setTheme':
        controller.setTheme(cmd.theme)
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
        controller.simulatePointerMove(cmd.x, cmd.y)
        break
    case 'panCamera':
        controller.panCamera(cmd.dx, cmd.dy)
        break
    case 'rotateCamera':
        controller.rotateCamera(cmd.alpha, cmd.beta)
        break
    case 'zoom':
        controller.zoomCamera(cmd.delta)
        break
    case 'setCameraTarget':
        controller.setCameraTarget(cmd.x, cmd.y, cmd.z)
        break
    case 'setCameraRotation':
        controller.setCameraRotation(cmd.alpha, cmd.beta)
        break
    case 'setCameraZoom':
        controller.setCameraZoom(cmd.distance)
        break
    }
}

onmessage = ev => {
    //get data
    const canvas: OffscreenCanvas = ev.data.canvas

    //create scene
    controller = new LocalController(canvas)

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
