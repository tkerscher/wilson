import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { TextBlock } from "@babylonjs/gui/2D/controls/textBlock"
import { sprintf } from "sprintf-js"
import { Project } from "../model/project"
import { PathInterpolator } from "./pathInterpolation"
import { GraphInterpolator } from "./graphInterpolation"

//Pattern to check for dynamic text references
const DataRefPattern = /%\(.+?\)/m
const GraphRefPattern = /%\(graphs\[(\d+?)\]\)/gm
const PathRefPattern = /%\(paths\[(\d+?)\]\.[x-z]\)/gm

//util interfaces used by TextEngine
interface _Graph {
    interpolation: GraphInterpolator
    currentValue: number
}
interface _Path {
    interpolation: PathInterpolator
    currentValue: Vector3
}

/**
 * Updates text based on a template string using interpolation of graphs and
 * paths on data in the given project.
 */
export class TextEngine {
    #project: Project
    #dirty = false

    #graphs: Map<number, _Graph>
    #graphProxy: Map<number, _Graph> //Actually proxy of map, but should not look like map

    #paths: Map<number, _Path>
    #pathProxy: Map<number, _Path> //Actually proxy of map, but should not look like map

    #dynamicText: Array<{
        template: string,
        target: TextBlock
    }>

    constructor(project: Project) {
        this.#project = project

        //We might have a sparse set of graph ids, so we use a map
        this.#graphs = new Map<number, _Graph>()
        //map wants us to access items via its get method, but our template
        //references them as an array => mimic an array via proxy
        this.#graphProxy = new Proxy(this.#graphs, {
            get: function (target, idx): number {
                return target.get(Number(idx))?.currentValue ?? 0.0
            }
        })

        this.#paths = new Map<number, _Path>()
        this.#pathProxy = new Proxy(this.#paths, {
            get: function(target, idx): Vector3 {
                return target.get(Number(idx))?.currentValue ?? Vector3.Zero()
            }
        })

        this.#dynamicText = []
    }

    get isDirty(): boolean {
        return this.#dirty
    }

    /**
     * Adds text to engine and returns true if it's a dynamic text
     * @param target TextBlock element to be updated
     * @param template Template string used for creating text
     * @returns True, if the text is dynamic
     */
    addText(target: TextBlock, template: string): boolean {
        //static content?
        if (!DataRefPattern.test(template)) {
            target.text = template
            return false
        }

        //add text to list
        this.#dynamicText.push({
            template: template,
            target: target
        })
        this.#dirty = true

        //check for graph references
        for (const match of template.matchAll(GraphRefPattern)) {
            const graph_id = Number(match[1])
            if (!this.#graphs.has(graph_id)) {
                this.#graphs.set(graph_id, {
                    interpolation: new GraphInterpolator(graph_id, this.#project),
                    currentValue: NaN
                })
            }
        }

        //Check for path references
        for (const match of template.matchAll(PathRefPattern)) {
            const path_id = Number(match[1])
            if (!this.#paths.has(path_id)) {
                this.#paths.set(path_id, {
                    interpolation: new PathInterpolator(path_id, this.#project),
                    currentValue: new Vector3()
                })
            }
        }

        //it's a dynamic text
        return true
    }

    /**
     * Removes the given target from the list of targets to be updated if
     * previously added.
     * @param target The target to remove
     */
    removeText(target: TextBlock) {
        const idx = this.#dynamicText.findIndex(e => e.target == target)
        if (idx > -1)
            this.#dynamicText.splice(idx, 1)
    }

    /**
     * Updates all registered texts with data evaluated at the given time point
     * @param currentFrame Time point used for interpolation
     */
    update(currentFrame: number) {
        //update values
        this.#graphs.forEach((g: _Graph) => {
            g.currentValue = g.interpolation.interpolate(currentFrame)
        })
        this.#paths.forEach((p: _Path) => {
            p.currentValue = p.interpolation.interpolate(currentFrame)
        })

        //update texts
        this.#dynamicText.forEach(txt => {
            txt.target.text = sprintf(txt.template, {
                //The following names must match the indicator used in the templates
                graphs: this.#graphProxy,
                paths: this.#pathProxy
            })
        })

        this.#dirty = false
    }
}
