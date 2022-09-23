import {
    Animation,
    AnimationGroup, 
    Color3, 
    Color4, 
    Engine, 
    IAnimationKey, 
    Node, 
    Scene, 
    StandardMaterial, 
    Vector3
} from "@babylonjs/core";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D";
import { Project } from "../model/project";
import { ColorProperty, ScalarProperty, VectorProperty } from "../model/properties";
import { getInterpolation } from "./interpolation";
import { setProperty } from "../util/property";
import { toHex } from "../util/colorToHex";
import { TextEngine } from "./textEngine";

const BackgroundColor = new Color4(0.239, 0.239, 0.239, 1.0)

export class SceneBuilder {
    animationGroup: AnimationGroup
    scene: Scene

    overlayTexture: AdvancedDynamicTexture
    textEngine: TextEngine

    project: Project
    nextId: number = 0

    groupMap: Map<string, Node>

    #materialMap: Map<string, StandardMaterial>
    defaultMaterial: StandardMaterial

    constructor(project: Project, engine: Engine) {
        this.project = project
        this.scene = new Scene(engine)
        this.animationGroup = new AnimationGroup("animationGroup", this.scene)

        this.groupMap = new Map<string, Node>()

        this.#materialMap = new Map<string, StandardMaterial>()
        this.defaultMaterial = new StandardMaterial("default")
        this.defaultMaterial.diffuseColor = Color3.Black()
        this.defaultMaterial.freeze()

        this.overlayTexture = AdvancedDynamicTexture.CreateFullscreenUI("GUI", true, this.scene)
        this.textEngine = new TextEngine(this.project)
        //hook up text engine
        {
            //local refs; cant use this inside lambda
            const engine = this.textEngine
            const anim = this.animationGroup
            const scene = this.scene

            var lastFrame: number = Number.NaN
            scene.onBeforeRenderObservable.add(() => {
                //Only update if necessary
                const currentFrame = anim.animatables[0].masterFrame
                if (lastFrame != currentFrame) {
                    lastFrame = currentFrame
                    engine.update(currentFrame)
                }
            })
        }

        this.scene.clearColor = BackgroundColor
    }

    getGroup(group: string): Node {
        if (!this.groupMap.has(group)) {
            let value = new Node(group + '_group', this.scene)
            //hide hidden group
            if (!!this.project.hiddenGroups.find(g => g == group))
                value.setEnabled(false)
            //store new group in map
            this.groupMap.set(group, value)
            return value
        }
        else {
            return this.groupMap.get(group)!
        }
    }

    parseScalar(scalar: ScalarProperty|undefined, target: any, property: string): void {
        if (!scalar || !scalar.source) {
            return setProperty(target, property, 0.0)
        }

        switch (scalar.source.$case) {
            case 'constValue':
                return setProperty(target, property, scalar.source.constValue)
            case 'graphId':
                const id = scalar.source.graphId
                const graph = this.project.graphs.find(g => g.id == id)
                if (!graph || graph.points.length == 0) {
                    //Referenced graph not found -> return default
                    return setProperty(target, property, 0.0)
                }
                else {
                    //create animation based on graph
                    const animation = new Animation(graph.name, property, 1.0,
                        Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE)
                    const keyFrames = graph.points.map(p =>
                        ({ frame: p.time, value: p.value}))
                    animation.setKeys(keyFrames)
                    animation.setEasingFunction(getInterpolation(graph.interpolation))
                    this.animationGroup.addTargetedAnimation(animation, target)
                    return
                }
        }
    }

    parseVector(vector: VectorProperty|undefined, target: any, property: string): void {
        if (!vector || !vector.source) {
            return setProperty(target, property, new Vector3())
        }

        switch (vector.source.$case) {
            case 'constValue':
                const p = vector.source.constValue
                return setProperty(target, property, new Vector3(p.x, p.y, p.z))
            case 'pathId':
                const id = vector.source.pathId
                const path = this.project.paths.find(p => p.id == id)
                if (!path || path.points.length == 0) {
                    //Referenced path not found -> return default
                    return setProperty(target, property, new Vector3())
                }
                else {
                    //create animation based on the referenced path
                    const animation = new Animation(path.name, property, 1.0,
                        Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE)
                    const keyFrames = path.points.map(p => ({ frame: p.time,
                        value: new Vector3(p.position?.x, p.position?.y, p.position?.z)}))
                    animation.setKeys(keyFrames)
                    animation.setEasingFunction(getInterpolation(path.interpolation))
                    this.animationGroup.addTargetedAnimation(animation, target)
                    return
                }
        }
    }

    parseColor(color: ColorProperty|undefined, name: string): StandardMaterial {
        if (!color || !color.source) {
            return this.defaultMaterial
        }

        switch (color.source.$case) {
            case 'constValue':
                const c = color.source.constValue
                return this.getStaticMaterial(c.r, c.g, c.b, c.a)
            case 'scalarValue':
                const [clr, alpha] = this.mapColor(color.source.scalarValue)
                return this.getStaticMaterial(clr.r, clr.g, clr.b, alpha)
            case 'graphId':
                const mat = new StandardMaterial(name)
                const id = color.source.graphId
                const graph = this.project.graphs.find(g => g.id == id)
                if (!graph || graph.points.length == 0) {
                    //Referenced graph not found -> return default
                    return this.defaultMaterial
                }
                else if (graph.points.length == 1) {
                    const scalar = graph.points[0].value
                    const [clr, alpha] = this.mapColor(scalar)
                    return this.getStaticMaterial(clr.r, clr.g, clr.b, alpha)
                }
                else {
                    const colorAnimation = new Animation(graph.name, "diffuseColor", 1.0,
                        Animation.ANIMATIONTYPE_COLOR3, Animation.ANIMATIONLOOPMODE_CYCLE)
                    const alphaAnimation = new Animation(graph.name, "alpha", 1.0,
                        Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE)

                    const clrFrames = Array<IAnimationKey>()
                    const alphaFrames = Array<IAnimationKey>()
                    var prevKey = graph.points[0].time
                    var prevVal = graph.points[0].value
                    for (var i = 1; i < graph.points.length; ++i) {
                        //In between frames, the new start is a duplicate of the previous end
                        //-> remove last frame before adding new
                        clrFrames.pop()
                        alphaFrames.pop()

                        const toKey = graph.points[i].time
                        const toVal = graph.points[i].value
                        const [clr, alpha] = this.colorFrames(prevKey, prevVal, toKey, toVal)
                        clrFrames.push(...clr)
                        alphaFrames.push(...alpha)

                        prevKey = toKey
                        prevVal = toVal
                    }

                    colorAnimation.setKeys(clrFrames)
                    alphaAnimation.setKeys(alphaFrames)

                    const interpolation = getInterpolation(graph.interpolation)
                    colorAnimation.setEasingFunction(interpolation)
                    alphaAnimation.setEasingFunction(interpolation)

                    this.animationGroup.addTargetedAnimation(colorAnimation, mat)
                    this.animationGroup.addTargetedAnimation(alphaAnimation, mat)
                    return mat
                }
        }
    }

    mapColor(scalar: number): [Color3,number] {
        if (!this.project.colormap || this.project.colormap.stops.length == 0) {
            return [Color3.Black(), 1.0]
        }
        const stops = this.project.colormap.stops

        //get first stop after scalar
        const stopIdx = stops.findIndex(s => s.value > scalar)
        if (stopIdx == -1) {
            //Clamp top
            const clr = stops[stops.length - 1].color
            if (!clr) {
                return [Color3.Black(), 1.0]
            }
            else {
                return [new Color3(clr.r, clr.g, clr.b), clr.a]
            }
        }
        if (stopIdx == 0) {
            //clamp bottom
            const clr = stops[0].color
            if (!clr) {
                return [Color3.Black(), 1.0]
            }
            else {
                return [new Color3(clr.r, clr.g, clr.b), clr.a]
            }
        }

        //linear interpolate between stops
        const before = stops[stopIdx - 1]
        const after = stops[stopIdx]
        if (!before.color || !after.color) {
            return [Color3.Black(), 1.0]
        }
        const lambda = (scalar - before.value) / (after.value - before.value)
        const red = before.color.r + (after.color.r - before.color.r) * lambda
        const green = before.color.g + (after.color.g - before.color.g) * lambda
        const blue = before.color.b + (after.color.b - before.color.b) * lambda
        const alpha = before.color.a + (after.color.a - before.color.a) * lambda
        return [new Color3(red, green, blue), alpha]
    }

    getStaticMaterial(r: number, g: number, b: number, a: number): StandardMaterial {
        //color already in use?
        const key = toHex(r, g, b, a)
        if (this.#materialMap.has(key)) {
            return this.#materialMap.get(key)!
        }
        else {
            //create new material
            const mat = new StandardMaterial(key, this.scene)
            mat.diffuseColor = new Color3(r, g, b)
            mat.alpha = a
            mat.freeze() //improves performance for static materials
            //store it
            this.#materialMap.set(key, mat)
            //done
            return mat
        }
    }

    isStaticMaterial(color: ColorProperty|undefined): boolean {
        if (!color || !color.source)
            return true
        
        switch (color.source.$case) {
        case 'constValue':
        case 'scalarValue':
            return true
        case 'graphId':
            const id = color.source.graphId
            const graph = this.project.graphs.find(g => g.id == id)
            return !graph || graph.points.length <= 0
        }
    }

    //Produces key frames to get not only start end end values, but also all gradient stops inbetween
    colorFrames(fromKey: number, fromVal: number, toKey: number, toVal: number): [Array<IAnimationKey>, Array<IAnimationKey>] {
        var clrFrames = Array<IAnimationKey>()
        var alphaFrames = Array<IAnimationKey>()
        if (!this.project.colormap || this.project.colormap.stops.length == 0) {
            return [clrFrames, alphaFrames]
        }
        const stops = this.project.colormap.stops
        const keyRange = toKey - fromKey
        const valRange = toVal - fromVal

        //get first stop after scalar
        let fromIdx = stops.findIndex(s => s.value > fromVal)
        if (fromIdx == -1) {
            fromIdx = stops.length - 1
        }
        var toIdx = stops.findIndex(s => s.value > toVal)
        if (toIdx == -1) {
            //Point one behind last
            toIdx = stops.length
        }

        //add first key
        const fromColor = this.mapColor(fromVal)
        clrFrames.push({ frame: fromKey, value: fromColor[0] })
        alphaFrames.push({ frame: fromKey, value: fromColor[1] })

        //add color stops inbetween
        const step = fromIdx <= toIdx ? 1 : -1
        for (var i = fromIdx; i != toIdx; i += step) {
            const stop = stops[i]
            if (!stop.color) {
                continue
            }
            const lambda = (stop.value - fromVal) / valRange
            const key = fromKey + lambda * keyRange
            clrFrames.push({frame: key, value: new Color3(stop.color.r, stop.color.g, stop.color.b)})
            alphaFrames.push({frame: key, value: stop.color.a})
        }

        //add last key
        const toColor = this.mapColor(toVal)
        clrFrames.push({ frame: toKey, value: toColor[0] })
        alphaFrames.push({ frame: toKey, value: toColor[1] })

        return [clrFrames, alphaFrames]
    }
}
