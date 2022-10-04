import { 
    Animation, 
    IAnimationKey,
    MeshBuilder, 
    Quaternion, 
    Vector3 
} from "@babylonjs/core"
import { Line } from "../../model/line"
import { PathInterpolator } from "../../interpolation/pathInterpolation"
import { SceneBuildTool } from "./tools"

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
    else if(theta > 3.141592) {
        axis = new Vector3(1.0,0.0,0.0) //rotate around e_x
        if (dir.y > 0.0)
            theta = Math.PI //radians
    }

    //create rotation quaternion
    return Quaternion.RotationAxis(axis, theta)
}

export function buildLine(tool: SceneBuildTool, line: Line) {
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
    tool.applyMetadata(mesh, line)

    const mat = tool.parseColor(line.color, "material")
    mesh.material = mat

    tool.parseScalar(line.lineWidth, mesh, "scaling.z")
    tool.parseScalar(line.lineWidth, mesh, "scaling.x")
    tool.parseVector(line.start, mesh, "position")

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
            const path = tool.project.paths.find(p => p.id == id)
            path?.points.forEach(p => times.push(p.time))
        }
        if (line.end?.source?.$case == 'pathId') {
            const id = line.end.source.pathId
            const path = tool.project.paths.find(p => p.id == id)
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
        times = times.filter((t, idx) => !(idx > 0 && Math.abs(times[idx - 1] - t) < 1e-7))

        //Create interpolators
        const startInt = new PathInterpolator(line.start, tool.project)
        const endInt = new PathInterpolator(line.end, tool.project)

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

            //get length and normalize
            lengthKeys.push({ frame: t, value: dir.length() })
            dir.normalize()

            //create rotation quaternion
            const quat = alignVector(dir)
            rotKeys.push({ frame: t, value: quat })
        })
        lengthAnimation.setKeys(lengthKeys)
        rotAnimation.setKeys(rotKeys)

        //link animation and were done
        tool.animationGroup.addTargetedAnimation(lengthAnimation, mesh)
        tool.animationGroup.addTargetedAnimation(rotAnimation, mesh)
    }
}
