import {
    Animation,
    AnimationGroup, 
    Engine, 
    HemisphericLight, 
    Scene, 
    TransformNode, 
    Vector3
} from "@babylonjs/core"
import { Project } from "../model/project"
import { buildCamera } from "./camera"
import { buildLine } from "./line"
import { SceneBuilder } from "./sceneBuilder"
import { buildSphere } from "./sphere"
import { TubeController } from "./tube"

export interface SceneContainer {
    animation: AnimationGroup,
    engine: Engine,
    scene: Scene,

    update: { (t: number): void }
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
    const tubes = project.tubes.map(t => new TubeController(builder, t))
    //project.labels.forEach(l => buildLabel(l))

    //set animation speed
    const ratio = project.meta?.speedRatio
    if (ratio && ratio != 0.0) {
        builder.animationGroup.speedRatio = ratio
    }
        
    //let there be light
    const light = new HemisphericLight("light", new Vector3(1, 1, 0), builder.scene);
    
    //We must ensure that there is at least one animation for correct UI behaviour
    if (builder.animationGroup.animatables.length == 0) {
        const node = new TransformNode("master", builder.scene)
        const anim = new Animation("masterAnimation", "scalingDeterminant", 1.0,
        Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE)
        anim.setKeys([{ frame: 0.0, value: 0.0}, { frame: 1.0, value: 0.0}])
        builder.animationGroup.addTargetedAnimation(anim, node)
    }
    
    //pad animations to make them all the same length
    builder.animationGroup.normalize(project.meta?.startTime, project.meta?.endTime)

    return {
        animation: builder.animationGroup,
        engine: builder.engine,
        scene: builder.scene,
        update: t => tubes.forEach(tt => tt.update(t))
    }
}
