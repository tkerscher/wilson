import { Project } from "../../model/project";
import { SceneController } from "./controller";
import { LocalController } from "./local";
import { isWorkerAvailable, WorkerController } from "./worker";

export function createController(project: Project, canvas: HTMLCanvasElement): SceneController {
    //see if offscreen canvas are available
    if (false) {
    // if (isWorkerAvailable()) {
        //use offscreen canvas in web worker
        return new WorkerController(project, canvas)
    }
    else {
        return new LocalController(project, canvas)
    }
}
