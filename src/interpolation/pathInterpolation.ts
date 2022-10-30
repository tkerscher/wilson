import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Project } from "../model/project";
import { VectorProperty } from "../model/properties";
import { getInterpolation } from "./functions"

//similar to path point, but position cannot be undefined
interface PathPoint {
    time: number,
    position: Vector3
}

/**
 * Interpolates between points on a path thus creating a continuous function
 * in time
 */
export class PathInterpolator {
    path: Array<PathPoint> = []
    #ease: ((t:number) => number)|null = null

    constructor(prop: VectorProperty | number | undefined, project: Project) {
        if (typeof prop == 'number') {
            this.#parsePath(prop, project)
            return
        }

        //fall back
        if (!prop || !prop.source) {
            this.path = [{ time: 0.0, position: new Vector3() }]
            return
        }

        switch(prop.source.$case) {
            case 'constValue':
                const p = prop.source.constValue
                this.path = [{ time: 0.0, position: new Vector3(p.x, p.y, p.z) }]
                return
            case 'pathId':
                const id = prop.source.pathId
                this.#parsePath(id, project)
                return
        }
    }

    /**
     * Interpolates
     * @param t The time point to evaluate the path at
     * @returns The interpolated position
     */
    interpolate(t: number): Vector3 {
        //get first stop after t
        const stopIdx = this.path.findIndex(p => p.time > t)
        if (stopIdx == -1) {
            //past last stop -> clamp at last one
            return this.path[this.path.length - 1].position
        }
        if (stopIdx == 0) {
            //before first -> clamp at first one
            return this.path[0].position
        }

        //short cut: t is near a stop -> return exact value
        if (this.path[stopIdx].time - t < 1e-7) {
            return this.path[stopIdx].position
        }

        //We know, that there are at least two stops (otherwise wed only get 0 and -1)
        //and that we are not at the edges -> we're save to interpolate

        const t_start = this.path[stopIdx - 1].time
        const t_end = this.path[stopIdx].time
        var lambda = (t - t_start) / (t_end - t_start)

        //ease if wanted
        if (!!this.#ease)
            lambda = this.#ease(lambda)

        const p_start = this.path[stopIdx - 1].position
        const p_end = this.path[stopIdx].position
        const dir = p_end.subtract(p_start)

        return p_start.add(dir.scaleInPlace(lambda))
    }

    #parsePath(id: number, project: Project) {
        const path = project.paths.find(p => p.id == id)
        if (!path || path.points.length == 0) {
            this.path =  [{ time: 0.0, position: new Vector3() }]
        }
        else {
            this.path = path.points.map(p => ({ time: p.time,
                position: new Vector3(p.position?.x, p.position?.y, p.position?.z)}))
            this.#ease = getInterpolation(path.interpolation)?.ease ?? null
        }
    }
}
