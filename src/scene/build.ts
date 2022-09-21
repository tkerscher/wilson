import {
    AbstractMesh,
    Animation,
    AnimationGroup, 
    ArcRotateCamera, 
    Color3, 
    Color4,
    Engine,
    HemisphericLight, 
    Node, 
    Scene,
    Tools,
    TransformNode, 
    Vector3
} from "@babylonjs/core"
import { Rectangle } from "@babylonjs/gui/2D"
import { Project } from "../model/project"
import { buildCamera } from "./camera"
import { buildLine } from "./line"
import { createOrientationViewScene } from "./orientationView"
import { SceneBuilder } from "./sceneBuilder"
import { buildGrid } from "./grid"
import { SphereBuilder } from "./sphere"
import { TubeController } from "./tube"
import { TextBuilder } from "./text"

export class SceneContainer {
    animation: AnimationGroup
    engine: Engine
    scene: Scene
    indicator: Scene
    camera: ArcRotateCamera
    grid: Node
    groupMap: Map<string, Node>
    textRoot: Rectangle

    #defCamTarget: Vector3
    #defCamPosition: Vector3
    #selectedMesh?: AbstractMesh
    #dirty: boolean = true
    
    // Animation control
    get currentFrame(): number { return this.animation.animatables[0].masterFrame }
    get isPlaying(): boolean { return this.animation.isPlaying }
    get isStatic(): boolean { return this.animation.animatables.length == 0 }
    get speedRatio(): number { return this.animation.speedRatio }
    set speedRatio(value: number) { this.animation.speedRatio = value }
    play(loop: boolean = true) { this.animation.play(loop) }
    pause() { this.animation.pause() }
    goToFrame(frame: number) { this.animation.goToFrame(frame); this.#dirty = true }

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

    //screenshot
    screenshot() {
        Tools.CreateScreenshot(this.engine, this.camera, { precision: 2.0 })
    }

    //theme
    updateTheme() {
        //retrieve colors from css
        const style = getComputedStyle(document.documentElement)
        const color = style.getPropertyValue('--scene-font-color').trim()
        const clear = style.getPropertyValue('--scene-background').trim()
        const grid  = style.getPropertyValue('--grid-color').trim()
        //update colors
        this.textRoot.color = color
        this.scene.clearColor = Color4.FromColor3(
            Color3.FromHexString(clear), 1.0)
    }

    constructor(project: Project, canvas: HTMLCanvasElement) {
        //create engine
        this.engine = new Engine(canvas, true, { preserveDrawingBuffer: true })

        //create scene builder
        let builder = new SceneBuilder(project, this.engine)

        //create camera
        this.camera = buildCamera(builder, project.camera)
        this.#defCamPosition = this.camera.position.clone()
        this.#defCamTarget = this.camera.target.clone()

        ///create objects
        //The order must be same as in Project!
        //Otherwise the ids will be wrong
        const sphereBuilder = new SphereBuilder(builder)
        project.spheres.forEach(s => sphereBuilder.build(s))
        project.lines.forEach(l => buildLine(builder, l))
        const tubes = project.tubes.map(t => new TubeController(builder, t))
        const textBuilder = new TextBuilder(builder)
        project.texts.forEach(t => textBuilder.build(t))

        //retrieve text root
        this.textRoot = textBuilder.rootContainer

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

        //set theme
        this.updateTheme()

        //Create indicator
        this.indicator = createOrientationViewScene(this.engine, this.camera)

        //add some render logic
        this.engine.runRenderLoop(() => {
            this.scene.render()
            this.indicator.render()
        })
        this.scene.registerBeforeRender(() => {
            if (this.animation.isPlaying || this.#dirty) {
                tubes.forEach(t => {
                    if (t.isEnabled)
                        t.update(this.currentFrame)
                })
                this.#dirty = false
            }
        })
    }
}
