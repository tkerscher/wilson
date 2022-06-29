import { Project } from "../model/project"
import { ScalarProperty } from "../model/properties"

interface ControlPoint {
    time: number
    value : number
}

export class ScalarInterpolator {
    points: Array<ControlPoint>

    constructor(prop: ScalarProperty | number | undefined, project: Project) {
        if (typeof prop == 'number') {
            this.points = this.#parseGraph(prop, project)
            return
        }

        //fall back
        if (!prop || !prop.source) {
            this.points = [{time: 0.0, value: 0.0}]
            return
        }

        switch(prop.source.$case) {
            case 'constValue':
                const v = prop.source.constValue
                this.points = [{ time: 0.0, value: v}]
                return
            case 'graphId':
                const id = prop.source.graphId
                this.points = this.#parseGraph(id, project)
        }
    }

    #parseGraph(id: number, project: Project): Array<ControlPoint> {
        const graph = project.graphs.find(g => g.id == id)
        if (!graph || graph.points.length == 0) {
            this.points = [{ time: 0.0, value: 0.0}]
            return [{ time: 0.0, value: 0.0 }]
        }
        return graph.points.map(p => ({ time: p.time, value: p.value }))
    }

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
        const lambda = (t - t_start) / (t_end - t_start)

        const v_start = this.points[stopIdx - 1].value
        const v_end = this.points[stopIdx].value

        return v_start * (1 - lambda) + v_end * lambda
    }
}
