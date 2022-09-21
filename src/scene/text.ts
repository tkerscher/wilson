import {
    Vector3
} from "@babylonjs/core"
import {
    AdvancedDynamicTexture,
    Control,
    Rectangle,
    StackPanel,
    TextBlock
} from "@babylonjs/gui/2D"
import { sprintf } from "sprintf-js";
import { Project } from "../model/project";
import { Text, TextPosition, textPositionToJSON } from "../model/text"
import { PathInterpolator } from "../util/pathInterpolate";
import { ScalarInterpolator } from "../util/scalarInterpolate";
import { SceneBuilder } from "./sceneBuilder";

//Pattern to check for dynamic text references
const DataRefPattern = /%\(.+?\)/m
const GraphRefPattern = /%\(graphs\[(\d+?)\]\)/gm
const PathRefPattern = /%\(paths\[(\d+?)\]\.[x-z]\)/gm

// type Position = 'upper left' |   'top'  | 'upper right' |
//                 'left'       | 'center' | 'right'       |
//                 'lower left' | 'bottom' | 'lower right'

//util interfaces used by TextEngine
interface _Graph {
    interpolation: ScalarInterpolator
    currentValue: number
}
interface _Path {
    interpolation: PathInterpolator
    currentValue: Vector3
}

//Util class for updating dynamic text
class TextEngine {
    #graphs: Map<number, _Graph>
    #graphProxy: {} //Actually proxy of map, but should not look like map

    #paths: Map<number, _Path>
    #pathProxy: {} //Actually proxy of map, but should not look like map
    
    #dynamicText: Array<{
        template: string,
        target: TextBlock
    }>

    constructor() {
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

    get empty(): boolean {
        return this.#dynamicText.length == 0
    }

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
    }

    addText(target: TextBlock, template: string, project: Project) {
        //add text to list
        this.#dynamicText.push({
            template: template,
            target: target
        })

        //check for graph references
        for (const match of template.matchAll(GraphRefPattern)) {
            const graph_id = Number(match[1])
            if (!this.#graphs.has(graph_id)) {
                this.#graphs.set(graph_id, {
                    interpolation: new ScalarInterpolator(graph_id, project),
                    currentValue: NaN
                })
            }
        }

        //Check for path references
        for (const match of template.matchAll(PathRefPattern)) {
            const path_id = Number(match[1])
            if (!this.#paths.has(path_id)) {
                this.#paths.set(path_id, {
                    interpolation: new PathInterpolator(path_id, project),
                    currentValue: new Vector3()
                })
            }
        }
    }
}

export class TextBuilder {
    #builder: SceneBuilder
    #texture: AdvancedDynamicTexture
    #panels: Map<number, StackPanel>
    #engine: TextEngine
    
    rootContainer: Rectangle

    constructor(builder: SceneBuilder) {
        this.#builder = builder
        this.#texture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, builder.scene)
        this.#panels = new Map<number, StackPanel>()
        this.#engine = new TextEngine()
        
        //build root container
        this.rootContainer = new Rectangle("textRoot")
        this.rootContainer.width = 1.0
        this.rootContainer.height = 1.0
        this.rootContainer.thickness = 0
        this.rootContainer.color = "white" //default text color
        this.#texture.addControl(this.rootContainer)
    }

    build(text: Text) {
        //create new text block
        const block = new TextBlock(text.name)
        block.resizeToFit = true

        //meta
        block.uniqueId = this.#builder.nextId++
        const parent = this.#builder.getGroup(text.group)
        //hook parent node up
        parent.onEnabledStateChangedObservable.add(
            () => block.isVisible = parent.isEnabled())
        
        //set params
        this.#parseContent(text.content, block)
        this.#builder.parseScalar(text.fontSize, block, "fontSize")
        this.#setAlignment(text.position, block)
        if (text.bold)
            block.fontWeight = "800"
        if (text.italic)
            block.fontStyle = "italic"
        
        //position
        this.#getPanel(text.position).addControl(block)
    }

    #getPanel(position: TextPosition): StackPanel {
        //default value
        if (position == TextPosition.UNRECOGNIZED)
            position = TextPosition.LOWER_LEFT
        //lazy creation
        if (this.#panels.has(position))
            return this.#panels.get(position)!

        const panel = new StackPanel(textPositionToJSON(position))
        panel.adaptWidthToChildren = true
        panel.spacing = 5
        panel.paddingBottom = "10"
        panel.paddingTop = "20"
        panel.paddingLeft = "10"
        panel.paddingRight = "10"

        switch (position) {
        case TextPosition.CENTER:
            panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
            panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
            break;
        case TextPosition.UPPER_RIGHT:
            panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
            panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
            panel.paddingRight = "100" //clear axis view
            break;
        case TextPosition.TOP:
            panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
            panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
            break;
        case TextPosition.UPPER_LEFT:
            panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT
            panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
            panel.paddingLeft = "80" //clear toolbox
            break;
        case TextPosition.LEFT:
            panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT
            panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
            break;
        case TextPosition.LOWER_LEFT:
            panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT
            panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
            break;
        case TextPosition.BOTTOM:
            panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
            panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
            break;
        case TextPosition.LOWER_RIGHT:
            panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
            panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
            break;
        case TextPosition.RIGHT:
            panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
            panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
            break;
        }

        this.rootContainer.addControl(panel)
        this.#panels.set(position, panel)
        return panel
    }

    #parseContent(content: string, target: TextBlock) {
        //static content?
        if (!DataRefPattern.test(content)) {
            target.text = content
            return
        }
        else {
            //If first dynamic text -> add hook for updating text engine
            if (this.#engine.empty) {
                //local refs; cant use this inside lambda
                const engine = this.#engine
                const anim = this.#builder.animationGroup
                const scene = this.#builder.scene

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

            //add text to engine
            this.#engine.addText(target, content, this.#builder.project)
        }
    }

    #setAlignment(position: TextPosition, target: TextBlock) {
        switch (position) {
        case TextPosition.CENTER:
            target.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
            target.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
            break;
        case TextPosition.UPPER_RIGHT:
            target.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
            target.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
            break;
        case TextPosition.TOP:
            target.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
            target.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
            break;
        case TextPosition.UPPER_LEFT:
            target.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT
            target.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
            break;
        case TextPosition.LEFT:
            target.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT
            target.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
            break;
        case TextPosition.LOWER_LEFT:
            target.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT
            target.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
            break;
        case TextPosition.BOTTOM:
            target.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
            target.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
            break;
        case TextPosition.LOWER_RIGHT:
            target.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
            target.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
            break;
        case TextPosition.RIGHT:
            target.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
            target.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
            break;
        }
    }
}
