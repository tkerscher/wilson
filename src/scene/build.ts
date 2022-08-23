import {
    AbstractMesh,
    Animation,
    AnimationGroup, 
    ArcRotateCamera, 
    Color3, 
    Engine,
    HemisphericLight, 
    Node, 
    Scene,
    TransformNode, 
    Vector3
} from "@babylonjs/core"
import { Project } from "../model/project"
import { buildCamera } from "./camera"
import { buildLine } from "./line"
import { createOrientationViewScene } from "./orientationView"
import { SceneBuilder } from "./sceneBuilder"
import { buildGrid } from "./grid"
import { buildSphere } from "./sphere"
import { TubeController } from "./tube"

export class SceneContainer {
    animation: AnimationGroup
    engine: Engine
    scene: Scene
    indicator: Scene
    camera: ArcRotateCamera
    grid: Node
    groupMap: Map<string, Node>

    #defCamTarget: Vector3
    #defCamPosition: Vector3
    #selectedMesh?: AbstractMesh
    
    // Animation control
    get currentFrame(): number { return this.animation.animatables[0].masterFrame }
    get isPlaying(): boolean { return this.animation.isPlaying }
    get isStatic(): boolean { return this.animation.animatables.length == 0 }
    get speedRatio(): number { return this.animation.speedRatio }
    set speedRatio(value: number) { this.animation.speedRatio = value }
    play(loop: boolean = true) { this.animation.play(loop) }
    pause() { this.animation.pause() }
    goToFrame(frame: number) { this.animation.goToFrame(frame) }

    //selection
    select(id: number|null) {
        if (this.#selectedMesh)
            this.#selectedMesh.renderOutline = false
        
        if (id != null) {
            const mesh = this.scene.getMeshByUniqueId(id)
            if (mesh) {
                this.#selectedMesh = mesh
                mesh.renderOutline = true
                mesh.outlineColor = Color3.Red()
                mesh.outlineWidth = 0.1
            }
            else {
                this.#selectedMesh = undefined
            }
        }
    }

    //group
    setGroupEnabled(name: string, enabled: boolean) {
        if (this.groupMap.has(name)) {
            const group = this.groupMap.get(name)!
            if (group.isEnabled() != enabled) {
                group.setEnabled(enabled)
            }
        }
    }

    //camera
    resetCamera() {
        this.camera.setTarget(this.#defCamTarget)
        this.camera.setPosition(this.#defCamPosition)
    }

    constructor(project: Project, canvas: HTMLCanvasElement) {
        //create engine
        this.engine = new Engine(canvas, true)

        //create scene builder
        let builder = new SceneBuilder(project, this.engine)

        //create camera
        this.camera = buildCamera(builder, project.camera)
        this.#defCamPosition = this.camera.position.clone()
        this.#defCamTarget = this.camera.target.clone()

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
        this.groupMap = builder.groupMap

        //create grid mesh
        this.grid = buildGrid(this.scene)

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
    }
}
