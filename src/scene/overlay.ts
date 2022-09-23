import {
    Control,
    Rectangle,
    StackPanel,
    TextBlock
} from "@babylonjs/gui/2D"
import { Overlay, TextPosition, textPositionToJSON } from "../model/overlay";
import { SceneBuilder } from "./sceneBuilder";

export class OverlayBuilder {
    #builder: SceneBuilder
    #panels: Map<number, StackPanel>
    
    rootContainer: Rectangle

    constructor(builder: SceneBuilder) {
        this.#builder = builder
        this.#panels = new Map<number, StackPanel>()
        
        //build root container
        this.rootContainer = new Rectangle("textRoot")
        this.rootContainer.width = 1.0
        this.rootContainer.height = 1.0
        this.rootContainer.thickness = 0
        this.rootContainer.color = "white" //default text color
        this.#builder.overlayTexture.addControl(this.rootContainer)
    }

    build(overlay: Overlay) {
        //create new text block
        const block = new TextBlock(overlay.name)
        block.resizeToFit = true

        //meta
        block.uniqueId = this.#builder.nextId++
        const parent = this.#builder.getGroup(overlay.group)
        if (!parent.isEnabled())
            block.isVisible = false
        //hook parent node up
        parent.onEnabledStateChangedObservable.add(
            () => block.isVisible = parent.isEnabled())
        
        //set params
        this.#builder.textEngine.addText(block, overlay.text)
        this.#builder.parseScalar(overlay.fontSize, block, "fontSize")
        this.#setAlignment(overlay.position, block)
        if (overlay.bold)
            block.fontWeight = "800"
        if (overlay.italic)
            block.fontStyle = "italic"
        
        //position
        this.#getPanel(overlay.position).addControl(block)
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
