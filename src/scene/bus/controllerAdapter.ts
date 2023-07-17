import { SceneController } from "../controller/controller";
import { Theme } from "../theme";
import { SceneCommandBus } from "./commandBus";
import { SceneEventBus } from "./eventBus";

export class ControllerAdapter {
    //command messages
    #resetCamera: () => void;
    #toggleGrid: () => void;
    #screenshot: () => void;
    #selectObject: (id: number|null) => void;
    #targetObject: (id: number) => void;
    #setObjectsEnabled: (e: {objectIds: number[]|null, enabled: boolean}) => void;
    #setPathEnabled: (e: {id: number, enabled: boolean, color: string}) => void;
    #setAlphaEnabled: (e: boolean) => void;
    #setStage: (url: string) => void;
    #removeStage: () => void;
    #setTheme: (theme: Theme) => void;
    #setColorMapMin: (value: number) => void;
    #setColorMapMax: (value: number) => void;

    constructor(controller: SceneController) {
        //create handlers
        this.#resetCamera = () => controller.resetCamera();
        this.#toggleGrid = () => controller.setGridEnabled(!controller.isGridEnabled);
        this.#screenshot = () => controller.screenshot();
        this.#selectObject = (id: number|null) => controller.select(id);
        this.#targetObject = (id: number) => controller.target(id);
        this.#setObjectsEnabled = (e: {objectIds: number[]|null, enabled: boolean}) =>
            controller.setObjectsEnabled(e.objectIds, e.enabled);
        this.#setPathEnabled = (e: {id: number, enabled: boolean, color: string}) =>
            controller.setPathEnabled(e.id, e.enabled, e.color);
        this.#setAlphaEnabled = (e: boolean) => controller.setAlphaBlendingEnabled(e);
        this.#setStage = (url: string) => controller.loadStage(url);
        this.#removeStage = () => controller.removeStage();
        this.#setTheme = (theme: Theme) => controller.setTheme(theme);
        this.#setColorMapMin = (value: number) => controller.setColorMapMinScalar(value);
        this.#setColorMapMax = (value: number) => controller.setColorMapMaxScalar(value);

        //register handlers
        SceneCommandBus.on("ResetCamera", this.#resetCamera);
        SceneCommandBus.on("ToggleGrid", this.#toggleGrid);
        SceneCommandBus.on("Screenshot", this.#screenshot);
        SceneCommandBus.on("SelectObject", this.#selectObject);
        SceneCommandBus.on("TargetObject", this.#targetObject);
        SceneCommandBus.on("SetObjectsEnabled", this.#setObjectsEnabled);
        SceneCommandBus.on("SetPathEnabled", this.#setPathEnabled);
        SceneCommandBus.on("SetAlphaBlendingEnabled", this.#setAlphaEnabled);
        SceneCommandBus.on("SetStage", this.#setStage);
        SceneCommandBus.on("RemoveStage", this.#removeStage);
        SceneCommandBus.on("SetTheme", this.#setTheme);
        SceneCommandBus.on("SetColorMapMinScalar", this.#setColorMapMin);
        SceneCommandBus.on("SetColorMapMaxScalar", this.#setColorMapMax);

        //register events
        controller.registerOnObjectPicked((id: number|null) =>
            SceneEventBus.emit("ObjectPicked", id));
    }

    dispose() {
        //deregister handlers
        SceneCommandBus.off("ResetCamera", this.#resetCamera);
        SceneCommandBus.off("ToggleGrid", this.#toggleGrid);
        SceneCommandBus.off("Screenshot", this.#screenshot);
        SceneCommandBus.off("SelectObject", this.#selectObject);
        SceneCommandBus.off("TargetObject", this.#targetObject);
        SceneCommandBus.off("SetObjectsEnabled", this.#setObjectsEnabled);
        SceneCommandBus.off("SetPathEnabled", this.#setPathEnabled);
        SceneCommandBus.off("SetAlphaBlendingEnabled", this.#setAlphaEnabled);
        SceneCommandBus.off("SetStage", this.#setStage);
        SceneCommandBus.off("RemoveStage", this.#removeStage);
        SceneCommandBus.off("SetTheme", this.#setTheme);
        SceneCommandBus.off("SetColorMapMinScalar", this.#setColorMapMin);
        SceneCommandBus.off("SetColorMapMaxScalar", this.#setColorMapMax);
    }
}
