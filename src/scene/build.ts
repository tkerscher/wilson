import {
    Animation,
    AnimationGroup, 
    ArcRotateCamera, 
    Engine, 
    HemisphericLight, 
    Scene, 
    TransformNode, 
    Vector3
} from "@babylonjs/core"
import { Project } from "../model/project"
import { buildCamera } from "./camera"
import { buildLine } from "./line"
import { createOrientationViewScene } from "./orientationView"
import { SceneBuilder } from "./sceneBuilder"
import { buildSphere } from "./sphere"
import { TubeController } from "./tube"

export class SceneContainer {
    animation: AnimationGroup
    engine: Engine
    scene: Scene
    indicator: Scene
    camera: ArcRotateCamera
    
    // Animation control
    get currentFrame(): number { return this.animation.animatables[0].masterFrame }
    get isPlaying(): boolean { return this.animation.isPlaying }
    get isStatic(): boolean { return this.animation.animatables.length == 0 }
    get speedRatio(): number { return this.animation.speedRatio }
    set speedRatio(value: number) { this.animation.speedRatio = value }
    play(loop: boolean = true) { this.animation.play(loop) }
    pause() { this.animation.pause() }
    goToFrame(frame: number) { this.animation.goToFrame(frame) }

    constructor(project: Project, canvas: HTMLCanvasElement) {
        console.log('foo')

        //create engine
        this.engine = new Engine(canvas, true)

        //create scene builder
        let builder = new SceneBuilder(project, this.engine)

        //create camera
        this.camera = buildCamera(builder, project.camera)

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

        //copy from builder
        this.animation = builder.animationGroup
        this.scene = builder.scene

        //Create indicator
        this.indicator = createOrientationViewScene(this.engine, this.camera)

        //add some render logic
        this.engine.runRenderLoop(() => {
            this.scene.render()
            this.indicator.render()
        })
        this.scene.registerBeforeRender(() => {
            tubes.forEach(t => t.update(this.currentFrame))
        })

        //DEBUG
        console.log(builder.groupMap)
    }
}
