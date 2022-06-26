import {
    AnimationGroup, 
    Engine, 
    HemisphericLight, 
    Scene, 
    Vector3
} from "@babylonjs/core"
import { Project } from "../model/project"
import { buildCamera } from "./camera"
import { buildLine } from "./line"
import { SceneBuilder } from "./sceneBuilder"
import { buildSphere } from "./sphere"

export interface SceneContainer {
    animation: AnimationGroup,
    engine: Engine,
    scene: Scene
}

export function createScene(project: Project, canvas: HTMLCanvasElement): SceneContainer {
    let builder = new SceneBuilder(project, canvas)

    //create camera
    buildCamera(builder, project.camera)

    ///create objects
    //The order must be same as in Project!
    //Otherwise the ids will be wrong
    project.spheres.forEach(s => buildSphere(builder, s))
    project.lines.forEach(l => buildLine(builder, l))
    //project.tubes.forEach(t => buildTube(t))
    //project.labels.forEach(l => buildLabel(l))

    //set animation speed
    const ratio = project.meta?.speedRatio
    if (ratio && ratio != 0.0) {
        builder.animationGroup.speedRatio = ratio
    }

    //pad animations to make them all the same length
    builder.animationGroup.normalize(project.meta?.startTime, project.meta?.endTime)

    //let there be light
    const light = new HemisphericLight("light", new Vector3(1, 1, 0), builder.scene);

    return {
        animation: builder.animationGroup,
        engine: builder.engine,
        scene: builder.scene
    }
}
