import { Animation, AnimationGroup, ArcRotateCamera, Color3, Color4, CubicEase, Engine, HemisphericLight, IEasingFunction, MeshBuilder, Nullable, Scene, StandardMaterial, UniversalCamera, Vector3 } from '@babylonjs/core'
import { Camera } from './model/camera';
import { Interpolation } from './model/interpolation';
import { Label } from './model/label';
import { Line } from './model/line';
import { Project } from './model/project';
import { ColorProperty, ScalarProperty, VectorProperty } from './model/properties';
import { Sphere } from './model/sphere';
import { Tube } from './model/tube';

export interface SceneContainer {
    animation: AnimationGroup,
    engine: Engine,
    scene: Scene
}

export function createScene(project: Project, canvas: HTMLCanvasElement): SceneContainer {
    return new SceneBuilder(project, canvas).build()
}

class SceneBuilder {
    #animationGroup: AnimationGroup
    #engine: Engine
    #project: Project
    #scene: Scene

    constructor(project: Project, canvas: HTMLCanvasElement) {
        this.#project = project
        this.#engine = new Engine(canvas, true)
        this.#scene = new Scene(this.#engine)
        this.#animationGroup = new AnimationGroup("animationGroup", this.#scene)
    }

    build(): SceneContainer {
        //clear color
        const cc = this.#project.clearColor
        this.#scene.clearColor = cc ? new Color4(cc.r, cc.g, cc.b, 1.0) : new Color4(1.0,1.0,1.0,1.0)

        //create camera
        this.#buildCamera(this.#project.camera)
        //create objects
        this.#project.spheres.forEach(s => this.#buildSphere(s))
        this.#project.lines.forEach(l => this.#buildLine(l))
        this.#project.tubes.forEach(t => this.#buildTube(t))
        this.#project.labels.forEach(l => this.#buildLabel(l))

        //set animation speed
        const ratio = this.#project.meta?.speedRatio
        if (ratio && ratio != 0.0) {
            this.#animationGroup.speedRatio = ratio
        }

        //pad animations to make them all the same length
        this.#animationGroup.normalize(this.#project.meta?.startTime, this.#project.meta?.endTime)

        //let there be light
        const light = new HemisphericLight("light", new Vector3(1, 1, 0), this.#scene);

        return {
            animation: this.#animationGroup,
            engine: this.#engine,
            scene: this.#scene
        }
    }

    #buildCamera(camera: Camera|undefined) {
        var cam = new UniversalCamera("camera", new Vector3(10,10,10), this.#scene)
        cam.target = new Vector3()

        if (camera) {
            const position = this.#parseVector(camera.position, "position")
            if (position instanceof Vector3) {
                cam.position = position
            }
            else {
                this.#animationGroup.addTargetedAnimation(position, cam)
            }

            const target = this.#parseVector(camera.target, "target")
            if (target instanceof Vector3) {
                cam.target = target
            }
            else {
                this.#animationGroup.addTargetedAnimation(target, cam)
            }
        }

        cam.attachControl(true)
    }
    #buildSphere(sphere: Sphere) {
        if (!sphere.isVisible) {
            return
        }

        var mesh = MeshBuilder.CreateSphere(sphere.name, undefined, this.#scene)

        const radius = this.#parseScalar(sphere.radius, "scalingDeterminant")
        if (typeof radius == 'number') {
            mesh.scalingDeterminant = radius
        }
        else {
            this.#animationGroup.addTargetedAnimation(radius, mesh)
        }

        const position = this.#parseVector(sphere.position, "position")
        if (position instanceof Vector3) {
            mesh.position = position
        }
        else {
            this.#animationGroup.addTargetedAnimation(position, mesh)
        }

        const color = this.#parseColor(sphere.color, "material.diffuseColor")
        var mat = new StandardMaterial(sphere.name + '_mat', this.#scene)
        mesh.material = mat
        if (color instanceof Color3) {
            mat.diffuseColor = color
        }
        else {
            this.#animationGroup.addTargetedAnimation(color, mesh)
        }
    }
    #buildLine(line: Line) {
        throw Error('Not Implemented')//TODO
    }
    #buildTube(tube: Tube) {
        throw Error('Not implemented')//TODO
    }
    #buildLabel(label: Label) {
        throw Error('Not implemented')//TODO
    }

    #parseScalar(scalar: ScalarProperty|undefined, property: string): number|Animation {
        if (!scalar || !scalar.source) {
            return 0.0
        }

        switch (scalar.source.$case) {
            case 'constValue':
                return scalar.source.constValue        
            case 'graphId':
                const id = scalar.source.graphId
                const graph = this.#project.graphs.find(g => g.id == id)
                if (!graph || graph.points.length == 0) {
                    //Referenced graph not found -> return default
                    return 0.0
                }
                else {
                    //create animation based on graph
                    const animation = new Animation(graph.name, property, 1.0,
                        Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE)
                    const keyFrames = graph.points.map(p =>
                        ({ frame: p.time, value: p.value}))
                    animation.setKeys(keyFrames)
                    const easing = this.#parseInterpolation(graph.interpolation)
                    animation.setEasingFunction(easing)
                    return animation
                }
        }
    }
    #parseVector(vector: VectorProperty|undefined, property: string): Vector3|Animation {
        if (!vector || !vector.source) {
            return new Vector3()
        }

        switch (vector.source.$case) {
            case 'constValue':
                const p = vector.source.constValue
                return new Vector3(p.x, p.y, p.z)
            case 'pathId':
                const id = vector.source.pathId
                const path = this.#project.paths.find(p => p.id == id)
                if (!path || path.points.length == 0) {
                    //Referenced path not found -> return default
                    return new Vector3()
                }
                else {
                    //create animation based on the referenced path
                    const animation = new Animation(path.name, property, 1.0,
                        Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE)
                    const keyFrames = path.points.map(p => ({ frame: p.time,
                        value: new Vector3(p.position?.x, p.position?.y, p.position?.z)}))
                    animation.setKeys(keyFrames)
                    const easing = this.#parseInterpolation(path.interpolation)
                    animation.setEasingFunction(easing)
                    return animation
                }
        }
    }
    #parseColor(color: ColorProperty|undefined, property: string): Color3|Animation {
        if (!color || !color.source) {
            return Color3.Black()
        }

        switch (color.source.$case) {
            case 'constValue':
                const c = color.source.constValue
                return new Color3(c.r, c.g, c.b)
            case 'graphId':
                const id = color.source.graphId
                const graph = this.#project.graphs.find(g => g.id == id)
                if (!graph || graph.points.length == 0) {
                    //Referenced graph not found -> return default
                    return Color3.Black()
                }
                else {
                    const animation = new Animation(graph.name, property, 1.0,
                        Animation.ANIMATIONTYPE_COLOR3, Animation.ANIMATIONLOOPMODE_CYCLE)
                    //We need to normalize the values for the colormap -> get min, max
                    const min = Math.min(...graph.points.map(p => p.value))
                    const max = Math.max(...graph.points.map(p => p.value))
                    const keyFrames = graph.points.map(p => 
                        ({ frame: p.time, value: this.#translateColor(p.value, min, max)}))
                    animation.setKeys(keyFrames)
                    const easing = this.#parseInterpolation(graph.interpolation)
                    animation.setEasingFunction(easing)
                    return animation
                }
        }
    }

    /**
     * Translates a value to a color using a color map
     * @param value Value to be looked up in the color map
     */
    #translateColor(value: number, min: number, max: number): Color3 {
        throw Error('Not Implemented') //TODO
    }

    #parseInterpolation(interpolation: Interpolation): Nullable<IEasingFunction> {
        switch (interpolation) {
            case Interpolation.STEP:
                return new StepEasing()        
            case Interpolation.LINEAR:
                return null
            case Interpolation.CUBIC:
                return new CubicEase()
            default:
                //Unknown interpolation. Might happen if the protobuf files get
                //updated. -> Return default mode: linear
                return null
        }
    }
}

class StepEasing implements IEasingFunction {
    ease(gradient: number): number {
        return 0.0
    }
}
