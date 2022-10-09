import { Project } from "../../model/project";
import { getCurrentTheme } from "../theme";
import { SceneController } from "./controller";
import { LocalController } from "./local";
import { isWorkerAvailable, WorkerController } from "./worker";

export function createController(project: Project, canvas: HTMLCanvasElement): SceneController {
    //create offscreen renderer for enhanced performance or fall back to local renderer
    const controller = isWorkerAvailable() ?
        new WorkerController(project, canvas) :
        new LocalController(project, canvas)
    
    //set theme
    const theme = getCurrentTheme()
    controller.setTheme(theme)

    //return controller
    return controller
}
