import { Control } from "@babylonjs/gui/2D/controls/control"
import { Rectangle } from "@babylonjs/gui/2D/controls/rectangle"
import { StackPanel } from "@babylonjs/gui/2D/controls/stackPanel"
import { TextBlock } from "@babylonjs/gui/2D/controls/textBlock"

import { Overlay, TextPosition, textPositionToJSON } from "../../model/overlay";
import { SceneBuildTool } from "./tools";

export class OverlayBuilder {
    #tool: SceneBuildTool
    #panels: Map<number, StackPanel>
    
    rootContainer: Rectangle

    constructor(tool: SceneBuildTool) {
        this.#tool = tool
        this.#panels = new Map<number, StackPanel>()
        
        //build root container
        this.rootContainer = new Rectangle("textRoot")
        this.rootContainer.width = 1.0
        this.rootContainer.height = 1.0
        this.rootContainer.thickness = 0
        this.rootContainer.color = "white" //default text color
        this.#tool.overlayTexture.addControl(this.rootContainer)
    }

    build(overlay: Overlay) {
        //create new text block
        const block = new TextBlock(overlay.name)
        block.resizeToFit = true

        //meta
        this.#tool.applyMetadata(block, overlay)
        
        //set params
        this.#tool.textEngine.addText(block, overlay.text)
        this.#tool.parseScalar(overlay.fontSize, block, "fontSize")
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
        let panel = this.#panels.get(position)
        if (panel)
            return panel

        panel = new StackPanel(textPositionToJSON(position))
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
