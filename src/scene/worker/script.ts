import { Project } from "../../model/project";
import { LocalController } from "../controller/local";
import { WorkerCommand } from "./command";
import { AnimationLoopEvent, FrameChangedEvent, ObjectPickedEvent } from "./event";

import "./font";
let controller: LocalController;

function messageHandler(ev: MessageEvent<WorkerCommand>) {
    //Wire up messages to controller
    switch (ev.data.type) {
    case 'load':
        {
            //decode project
            const serialized: ArrayBufferLike = ev.data.data;
            const data = new Uint8Array(serialized);
            const project: Project = Project.decode(data);
            //load it
            controller.load(project);
        }
        break;
    case 'loadStage':
        controller.loadStage(ev.data.url);
        break;
    case 'removeStage':
        controller.removeStage();
        break;
    case 'play':
        controller.play();
        break;
    case 'pause':
        controller.pause();
        break;
    case 'goToFrame':
        controller.goToFrame(ev.data.frame);
        break;
    case 'resetCamera':
        controller.resetCamera();
        break;
    case 'resize':
        controller.resize(ev.data.width, ev.data.height);
        break;
    case 'setTheme':
        controller.setTheme(ev.data.theme);
        break;
    case 'select':
        controller.select(ev.data.id);
        break;
    case 'target':
        controller.target(ev.data.id);
        break;
    case 'setGridEnabled':
        controller.setGridEnabled(ev.data.enabled);
        break;
    case 'setGroupEnabled':
        controller.setGroupEnabled(ev.data.group, ev.data.enabled);
        break;
    case 'setPathEnabled':
        controller.setPathEnabled(ev.data.id, ev.data.enabled, ev.data.color);
        break;
    case 'pointerDown':
        controller.simulatePointerDown(ev.data.x, ev.data.y);
        break;
    case 'pointerUp':
        controller.simulatePointerUp(ev.data.x, ev.data.y);
        break;
    case 'pointermove':
        controller.simulatePointerMove(ev.data.x, ev.data.y);
        break;
    case 'panCamera':
        controller.panCamera(ev.data.dx, ev.data.dy);
        break;
    case 'rotateCamera':
        controller.rotateCamera(ev.data.alpha, ev.data.beta);
        break;
    case 'zoom':
        controller.zoomCamera(ev.data.delta);
        break;
    case 'setCameraTarget':
        controller.setCameraTarget(ev.data.x, ev.data.y, ev.data.z);
        break;
    case 'setCameraRotation':
        controller.setCameraRotation(ev.data.alpha, ev.data.beta);
        break;
    case 'setCameraZoom':
        controller.setCameraZoom(ev.data.distance);
        break;
    }
}

onmessage = ev => {
    //get data
    const canvas: OffscreenCanvas = ev.data.canvas;

    //create scene
    controller = new LocalController(canvas);

    //register callbacks
    controller.registerOnAnimationLoop(() => postMessage({
        type: 'onAnimationLoop'
    } as AnimationLoopEvent));
    controller.registerOnFrameChanged(frame => postMessage({
        type: 'onFrameChanged',
        currentFrame: frame
    } as FrameChangedEvent));
    controller.registerOnObjectPicked(id => postMessage({
        type: 'onObjectPicked',
        objectId: id
    } as ObjectPickedEvent));

    //tell we're finished building
    postMessage('done');
    //Project is loaded -> switch to interactive message handler
    onmessage = messageHandler;
};
