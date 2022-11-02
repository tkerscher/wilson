import { getCurrentTheme } from "../theme";
import { SceneController } from "./controller";

function isWorkerAvailable(): boolean {
    //Check if it's safe to use web worker
    //In Debug mode, only Chrome supports imports in web worker scripts (which we use)
    //While they compiled away in production, in debug we can only use chrome with web worker
    //TODO: It seems currently firefox struggles with babylon js in worker due to references to
    //      document (which is not available in web workers). Strangely, it works in chrome though
    return !!window.Worker &&
        !!HTMLCanvasElement.prototype.transferControlToOffscreen &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore (window.chrome)
        !!window.chrome
}

export async function createController(canvas: HTMLCanvasElement): Promise<SceneController> {
    //create offscreen renderer for enhanced performance or fall back to local renderer
    return (() => {
        if (isWorkerAvailable()) {
            return import("./local").then(mod => {
                return new mod.LocalController(canvas)
            })
        }
        else {
            return import("./worker").then(mod => {
                return new mod.WorkerController(canvas)
            })
    }})()
    .then(controller => {
        //set theme
        const theme = getCurrentTheme()
        controller.setTheme(theme)

        //finish
        return controller
    })
}
