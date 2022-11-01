import { Project } from "../model/project"
import { ScalarProperty } from "../model/properties"
import { getInterpolation } from "./functions"

//similar to graph point, but value cannot be undefined
interface ControlPoint {
    time: number
    value: number
}

/**
 * Interpolates between points on a graph thus creating a continuous function
 * in time
 */
export class GraphInterpolator {
    points: Array<ControlPoint> = []
    #ease: ((t:number) => number)|null = null

    constructor(prop: ScalarProperty | number | undefined, project: Project) {
        if (typeof prop == 'number') {
            this.#parseGraph(prop, project)
            return
        }

        //fall back
        if (!prop || !prop.source) {
            this.points = [{time: 0.0, value: 0.0}]
            return
        }

        switch(prop.source.$case) {
        case 'constValue':
        {
            const v = prop.source.constValue
            this.points = [{ time: 0.0, value: v}]
            return
        }
        case 'graphId':
        {
            const id = prop.source.graphId
            this.#parseGraph(id, project)
            return
        }}
    }

    /**
     * Interpolates
     * @param t The time point to evaluate the path at
     * @returns The interpolated value
     */
    interpolate(t: number): number {
        //get first stop after t
        const stopIdx = this.points.findIndex(p => p.time > t)
        if (stopIdx == -1) {
            //past last stop -> clamp at last one
            return this.points[this.points.length - 1].value
        }
        if (stopIdx == 0) {
            //before first -> clamp at first one
            return this.points[0].value
        }

        //short cut: t is near a stop -> return exact value
        if (this.points[stopIdx].time - t < 1e-7) {
            return this.points[stopIdx].value
        }

        //We know, that there are at least two stops (otherwise wed only get 0 and -1)
        //and that we are not at the edges -> we're save to interpolate

        const t_start = this.points[stopIdx - 1].time
        const t_end = this.points[stopIdx].time
        let lambda = (t - t_start) / (t_end - t_start)

        //ease if wanted
        if (this.#ease)
            lambda = this.#ease(lambda)

        const v_start = this.points[stopIdx - 1].value
        const v_end = this.points[stopIdx].value

        return v_start * (1 - lambda) + v_end * lambda
    }

    #parseGraph(id: number, project: Project) {
        const graph = project.graphs.find(g => g.id == id)
        if (!graph || graph.points.length == 0) {
            //static graph
            this.points = [{ time: 0.0, value: 0.0}]
        }
        else {
            this.points = graph.points.map(p => ({ time: p.time, value: p.value }))
            this.#ease = getInterpolation(graph.interpolation)?.ease ?? null
        }
    }    
}
