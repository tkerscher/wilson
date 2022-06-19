import {
    Animation,
    AnimationGroup,
    Color3, Color4,
    Engine,
    HemisphericLight,
    IAnimationKey,
    MeshBuilder,
    Quaternion,
    Scene,
    StandardMaterial,
    UniversalCamera,
    Vector3
} from '@babylonjs/core'
import { Camera } from './model/camera';
import { Label } from './model/label';
import { Line } from './model/line';
import { Project } from './model/project';
import { ColorProperty, ScalarProperty, VectorProperty } from './model/properties';
import { Sphere } from './model/sphere';
import { Tube } from './model/tube';
import { PathInterpolator } from './util/pathInterpolate';
import { setProperty } from './util/property';
export interface SceneContainer {
    animation: AnimationGroup,
    engine: Engine,
    scene: Scene
}

export function createScene(project: Project, canvas: HTMLCanvasElement): SceneContainer {
    return new SceneBuilder(project, canvas).build()
}

const EY = new Vector3(0.0,1.0,0.0)

//Outlines for the arrows
const backwardArrowShape = [
    new Vector3(0.0,0.0,0.0),
    new Vector3(0.5,0.0,0.0),
    new Vector3(0.5,2./3.,0.0),
    new Vector3(1.0,2./3.,0.0),
    new Vector3(0.0,1.0,0.0)]
const forwardArrowShape = [
    new Vector3(0.0,0.0,0.0),
    new Vector3(1.0,1./3.,0.0),
    new Vector3(0.5,1./3.,0.0),
    new Vector3(0.5,1.0,0.0),
    new Vector3(0.0,1.0,0.0)]
const doubleArrowShape = [
    new Vector3(0.0,0.0,0.0),
    new Vector3(1.0,1./3.,0.0),
    new Vector3(0.5,1./3.,0.0),
    new Vector3(0.5,2./3.,0.0),
    new Vector3(1.0,2./3.,0.0),
    new Vector3(0.0,1.0,0.0)]

class SceneBuilder {
    #animationGroup: AnimationGroup
    #engine: Engine
    #project: Project
    #scene: Scene
    #nextId: number = 0
    #defaultMaterial: StandardMaterial

    constructor(project: Project, canvas: HTMLCanvasElement) {
        this.#project = project
        this.#engine = new Engine(canvas, true)
        this.#scene = new Scene(this.#engine)
        this.#animationGroup = new AnimationGroup("animationGroup", this.#scene)
        this.#defaultMaterial = new StandardMaterial("default")
        this.#defaultMaterial.diffuseColor = Color3.Black()
    }

    build(): SceneContainer {
        //clear color
        const cc = this.#project.clearColor
        this.#scene.clearColor = cc ? new Color4(cc.r, cc.g, cc.b, 1.0) : new Color4(1.0,1.0,1.0,1.0)

        //create camera
        this.#buildCamera(this.#project.camera)
        //create objects
        //The order must be same as in Project!
        //Otherwise the ids will be wrong
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
            this.#parseVector(camera.position, cam, "position")
            this.#parseVector(camera.target, cam, "target")
        }

        cam.attachControl(true)
    }
    #buildSphere(sphere: Sphere) {
        if (!sphere.isVisible) {
            return
        }

        var mesh = MeshBuilder.CreateSphere(sphere.name, undefined, this.#scene)
        mesh.uniqueId = this.#nextId++

        this.#parseScalar(sphere.radius, mesh, "scalingDeterminant")
        this.#parseVector(sphere.position, mesh, "position")

        const mat = this.#parseColor(sphere.color, "material")
        mesh.material = mat
    }
    #buildLine(line: Line) {
        if (!line.isVisible) {
            return
        }

        var mesh
        if (!line.pointForward && !line.pointBackward) {
            //create simple unit tube
            mesh = MeshBuilder.CreateCylinder(line.name, { height: 1.0 })        
        }
        else if(line.pointForward && !line.pointBackward) {
            mesh = MeshBuilder.CreateLathe(line.name, { shape: forwardArrowShape, tessellation: 24})
        }
        else if(!line.pointForward && line.pointBackward) {
            mesh = MeshBuilder.CreateLathe(line.name, { shape: backwardArrowShape, tessellation: 24})
        }
        else {
            mesh = MeshBuilder.CreateLathe(line.name, { shape: doubleArrowShape, tessellation: 24})
        }
        mesh.uniqueId = this.#nextId++

        const mat = this.#parseColor(line.color, "material")
        mesh.material = mat

        this.#parseScalar(line.lineWidth, mesh, "scaling.z")
        this.#parseScalar(line.lineWidth, mesh, "scaling.x")
        this.#parseVector(line.start, mesh, "position")

        //Short cut: Check if we need the lengthy calculation
        //We dont if there is nothing to animate
        if (line.start?.source?.$case != 'pathId' && line.end?.source?.$case != 'pathId') {
            const start = line.start?.source?.constValue ?? { x:0, y:0, z:0 }
            const end = line.end?.source?.constValue ?? { x:0, y:0, z:0 }
            const dir = new Vector3(end.x - start.x , end.y - start.y, end.z - start.z)

            mesh.scaling.y = dir.length()
            dir.normalize()

            const rot = alignVector(dir)
            mesh.rotationQuaternion = rot
        }
        else {
            //length and orientation depend on the vector pointing from end to start
            //so let's create that one first. We create two interpolators for both
            //start and end. Then we collect the time stops (at which they might
            //sharply change direction), remove (close) duplicates and create
            //distances by interpolating both

            var times = new Array<number>()
            if (line.start?.source?.$case == 'pathId') {
                const id = line.start.source.pathId
                const path = this.#project.paths.find(p => p.id == id)
                path?.points.forEach(p => times.push(p.time))
            }
            if (line.end?.source?.$case == 'pathId') {
                const id = line.end.source.pathId
                const path = this.#project.paths.find(p => p.id == id)
                path?.points.forEach(p => times.push(p.time))
            }

            //Edge case: There was no path, nor a static one (handled before)
            //Technically, we have a line from 0 to 0
            // -> set height scale to 0 and call it a day (after all its a edge case)
            if (times.length == 0) {
                mesh.scaling.y = 0.0
                return //no point in going on
            }

            //sort array (looks weird thanks to javascript...)
            times.sort((a, b) => a - b)

            //remove close duplicates
            times = times.filter((t, idx) => {
                //check before
                if (idx > 0 && Math.abs(times[idx - 1] - t) < 1e-7) {
                    return false //remove
                }
                return true //keep
            })

            //Create interpolators
            const startInt = new PathInterpolator(line.start, this.#project)
            const endInt = new PathInterpolator(line.end, this.#project)

            console.log(endInt)

            //alloc animations
            const lengthAnimation = new Animation(line.name + '_length', "scaling.y",
                1.0, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE)
            const rotAnimation = new Animation(line.name + '_rot', "rotationQuaternion",
                1.0, Animation.ANIMATIONTYPE_QUATERNION, Animation.ANIMATIONLOOPMODE_CYCLE)
            
            //We can finally create the animation
            const lengthKeys = new Array<IAnimationKey>()
            const rotKeys = new Array<IAnimationKey>()
            times.forEach(t => {
                //interpolate
                const start = startInt.interpolate(t)
                const end = endInt.interpolate(t)
                const dir = end.subtract(start)

                console.log('interpolate')
                console.log(start)
                console.log(end)

                //get length and normalize
                lengthKeys.push({ frame: t, value: dir.length() })
                dir.normalize()

                //create rotation quaternion
                const quat = alignVector(dir)
                console.log(quat)
                rotKeys.push({ frame: t, value: quat })
            })
            lengthAnimation.setKeys(lengthKeys)
            rotAnimation.setKeys(rotKeys)

            //link animation and were done
            this.#animationGroup.addTargetedAnimation(lengthAnimation, mesh)
            this.#animationGroup.addTargetedAnimation(rotAnimation, mesh)
        }
    }
    #buildTube(tube: Tube) {
        throw Error('Not implemented')//TODO
    }
    #buildLabel(label: Label) {
        throw Error('Not implemented')//TODO
    }

    #parseScalar(scalar: ScalarProperty|undefined, target: any, property: string): void {
        if (!scalar || !scalar.source) {
            return setProperty(target, property, 0.0)
        }

        switch (scalar.source.$case) {
            case 'constValue':
                return setProperty(target, property, scalar.source.constValue)
            case 'graphId':
                const id = scalar.source.graphId
                const graph = this.#project.graphs.find(g => g.id == id)
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
                    this.#animationGroup.addTargetedAnimation(animation, target)
                    return
                }
        }
    }
    #parseVector(vector: VectorProperty|undefined, target: any, property: string): void {
        if (!vector || !vector.source) {
            return setProperty(target, property, new Vector3())
        }

        switch (vector.source.$case) {
            case 'constValue':
                const p = vector.source.constValue
                return setProperty(target, property, new Vector3(p.x, p.y, p.z))
            case 'pathId':
                const id = vector.source.pathId
                const path = this.#project.paths.find(p => p.id == id)
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
                    this.#animationGroup.addTargetedAnimation(animation, target)
                    return
                }
        }
    }

    #parseColor(color: ColorProperty|undefined, name: string): StandardMaterial {
        if (!color || !color.source) {
            return this.#defaultMaterial
        }

        var mat = new StandardMaterial(name)
        switch (color.source.$case) {
            case 'constValue':
                const c = color.source.constValue
                mat.diffuseColor = new Color3(c.r, c.g, c.b)
                mat.alpha = c.a
                break
            case 'scalarValue':
                var [clr, alpha] = this.#mapColor(color.source.scalarValue)
                mat.diffuseColor = clr
                mat.alpha = alpha
                break
            case 'graphId':
                const id = color.source.graphId
                const graph = this.#project.graphs.find(g => g.id == id)
                if (!graph || graph.points.length == 0) {
                    //Referenced graph not found -> return default
                    return this.#defaultMaterial
                }
                else if (graph.points.length == 1) {
                    const scalar = graph.points[0].value
                    const [clr, alpha] = this.#mapColor(scalar)
                    mat.diffuseColor = clr
                    mat.alpha = alpha
                    break
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
                        const [clr, alpha] = this.#colorFrames(prevKey, prevVal, toKey, toVal)
                        clrFrames.push(...clr)
                        alphaFrames.push(...alpha)

                        prevKey = toKey
                        prevVal = toVal
                    }

                    colorAnimation.setKeys(clrFrames)
                    alphaAnimation.setKeys(alphaFrames)

                    this.#animationGroup.addTargetedAnimation(colorAnimation, mat)
                    this.#animationGroup.addTargetedAnimation(alphaAnimation, mat)
                    break
                }
        }
        return mat
    }

    #mapColor(scalar: number): [Color3,number] {
        if (!this.#project.colormap || this.#project.colormap.stops.length == 0) {
            return [Color3.Black(), 1.0]
        }
        const stops = this.#project.colormap.stops

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

    //Produces key frames to get not only start end end values, but also all gradient stops inbetween
    #colorFrames(fromKey: number, fromVal: number, toKey: number, toVal: number): [Array<IAnimationKey>, Array<IAnimationKey>] {
        var clrFrames = Array<IAnimationKey>()
        var alphaFrames = Array<IAnimationKey>()
        if (!this.#project.colormap || this.#project.colormap.stops.length == 0) {
            return [clrFrames, alphaFrames]
        }
        const stops = this.#project.colormap.stops
        const keyRange = toKey - fromKey
        const valRange = toVal - fromVal

        //get first stop after scalar
        const fromIdx = stops.findIndex(s => s.value > fromVal)
        var toIdx = stops.findIndex(s => s.value > toVal)
        if (toIdx == -1) {
            //Point one behind last
            toIdx = stops.length
        }

        //add first key
        const fromColor = this.#mapColor(fromVal)
        clrFrames.push({ frame: fromKey, value: fromColor[0] })
        alphaFrames.push({ frame: fromKey, value: fromColor[1] })

        //add color stops inbetween
        const step = fromIdx < toIdx ? 1 : -1
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
        const toColor = this.#mapColor(toVal)
        clrFrames.push({ frame: toKey, value: toColor[0] })
        alphaFrames.push({ frame: toKey, value: toColor[1] })

        return [clrFrames, alphaFrames]
    }
}

//util: align Vector to ey
function alignVector(dir: Vector3): Quaternion {
    //get rotation axis
    let axis = EY.cross(dir)
    //get rotation angle
    let theta = Math.acos(Vector3.Dot(EY, dir))
    
    //Check if parallel, it might be actually 180 degree
    // -> check y component (pos -> 0, neg -> 180)
    //also the rotation axis will be degenerate
    // -> use any, it does not matter
    if (theta < 1e-7) {
        axis = new Vector3(1.0,0.0,0.0) //rotate around e_x
        if (dir.y < 0.0)
        theta = Math.PI //radians
    }

    //create rotation quaternion
    return Quaternion.RotationAxis(axis, theta)
}
