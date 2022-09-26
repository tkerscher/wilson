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
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D"
import { Rectangle } from "@babylonjs/gui/2D"
import { Project } from "../model/project"

import { buildCamera } from "./objects/camera"
import { buildLine } from "./objects/line"
import { SphereBuilder } from "./objects/sphere"
import { TubeController } from "./objects/tube"
import { OverlayBuilder } from "./objects/overlay"

import { Description } from "./components/description"
import { buildGrid } from "./components/grid"
import { createOrientationViewScene } from "./components/orientationView"

import { isMetadata, SceneBuildTool } from "./objects/tools"
import { TextEngine } from "../interpolation/textEngine"

export class SceneContainer {
    animation: AnimationGroup
    engine: Engine
    scene: Scene
    indicator: Scene
    camera: ArcRotateCamera
    grid: Node
    groupMap: Map<string, Node>

    overlayRoot: Rectangle
    overlayTexture: AdvancedDynamicTexture
    textEngine: TextEngine
    #description: Description

    #defCamTarget: Vector3
    #defCamPosition: Vector3
    //#selectedMesh?: AbstractMesh
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
        if (id != null) {
            const mesh = this.scene.getMeshByUniqueId(id)
            if (mesh && isMetadata(mesh.metadata)) {
                this.#description.showDescription(
                    mesh, mesh.metadata.name, mesh.metadata.description
                )
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
        this.overlayRoot.color = color
        this.scene.clearColor = Color4.FromColor3(
            Color3.FromHexString(clear), 1.0)
    }

    constructor(project: Project, canvas: HTMLCanvasElement) {
        //create engine
        this.engine = new Engine(canvas, true, { preserveDrawingBuffer: true })

        //create scene builder
        let tool = new SceneBuildTool(project, this.engine)

        //create camera
        this.camera = buildCamera(tool, project.camera)
        this.#defCamPosition = this.camera.position.clone()
        this.#defCamTarget = this.camera.target.clone()

        ///create objects
        //The order must be same as in Project!
        //Otherwise the ids will be wrong
        const sphereBuilder = new SphereBuilder(tool)
        project.spheres.forEach(s => sphereBuilder.build(s))
        project.lines.forEach(l => buildLine(tool, l))
        const tubes = project.tubes.map(t => new TubeController(tool, t))
        const overlayBuilder = new OverlayBuilder(tool)
        project.overlays.forEach(o => overlayBuilder.build(o))

        //retrieve text root
        this.overlayRoot = overlayBuilder.rootContainer

        //set animation speed
        const ratio = project.meta?.speedRatio
        if (ratio && ratio != 0.0) {
            tool.animationGroup.speedRatio = ratio
        }
            
        //let there be light
        const light = new HemisphericLight("light", new Vector3(1, 1, 0), tool.scene);
        
        //We must ensure that there is at least one animation for correct UI behaviour
        if (tool.animationGroup.animatables.length == 0) {
            const node = new TransformNode("master", tool.scene)
            const anim = new Animation("masterAnimation", "scalingDeterminant", 1.0,
            Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE)
            anim.setKeys([{ frame: 0.0, value: 0.0}, { frame: 1.0, value: 0.0}])
            tool.animationGroup.addTargetedAnimation(anim, node)
        }
        
        //pad animations to make them all the same length
        tool.animationGroup.normalize(project.meta?.startTime, project.meta?.endTime)

        //copy from builder
        this.animation = tool.animationGroup
        this.scene = tool.scene
        this.groupMap = tool.groupMap
        this.overlayTexture = tool.overlayTexture
        this.textEngine = tool.textEngine

        //create description
        this.#description = new Description(this.overlayTexture, this.textEngine)

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
