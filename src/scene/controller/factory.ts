import { Project } from "../../model/project";
import { SceneController } from "./controller";
import { LocalController } from "./local";

export function createController(project: Project, canvas: HTMLCanvasElement): SceneController {
    //Right now we only have local controller, but later we want to add
    //web workers if offscreen canvas are supported. This way we can hide
    //the decision process

    return new LocalController(project, canvas)
}
