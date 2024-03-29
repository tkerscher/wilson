import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { Button } from "@babylonjs/gui/2D/controls/button";
import { Container } from "@babylonjs/gui/2D/controls/container";
import { Control } from "@babylonjs/gui/2D/controls/control";
import { Ellipse } from "@babylonjs/gui/2D/controls/ellipse";
import { Grid } from "@babylonjs/gui/2D/controls/grid";
import { Line } from "@babylonjs/gui/2D/controls/line";
import { Rectangle } from "@babylonjs/gui/2D/controls/rectangle";
import { Scene } from "@babylonjs/core/scene";
import { StackPanel } from "@babylonjs/gui/2D/controls/stackPanel";
import { TextBlock } from "@babylonjs/gui/2D/controls/textBlock";
import { TextEngine } from "../../interpolation/textEngine";
import { ObjectHandle } from "../objects/tools";

//Some styling constants
const AnchorDiameter = "15px";
const LineWidth = 5;
const HeaderHeight = "40px";
const MessageBoxWidth = "300px";
const MessageBoxCornerRadius = 6;
const MessageBoxThickness = 3;
const MessageBoxPadding = "10px";
const SeparatorHeight = "5px";
const TextSize = 16;
const TitleWeight = "800";

/**
 * UI element showing a message box on top of the scene providing additional
 * information about a given object. Points towards the object in 3D space.
 */
export class Description {
    #engine: TextEngine;
    #scene: Scene;

    #anchor: Ellipse;
    #line: Line;
    #messageBox: Rectangle;
    #separator: Rectangle;
    #title: TextBlock;
    #text: TextBlock;

    #handle?: ObjectHandle = undefined;

    constructor(texture: AdvancedDynamicTexture, scene: Scene, textEngine: TextEngine) {
        this.#engine = textEngine;
        this.#scene = scene;

        /************************ Create GUI elements *************************/

        //The next part will be a bit hard to read, since Babylon js does not
        //provide a descriptive language for the GUI ala HTML

        //drag helper (for intersection mouse movement on the whole scene)
        const helper = new Container();
        texture.addControl(helper);

        //Anchor is a dot displayed on the selected mesh
        const anchor = new Ellipse("gui_anchor");
        anchor.isVisible = false;
        anchor.width = AnchorDiameter;
        anchor.height = AnchorDiameter;
        anchor.background = "orange"; //TODO: use css
        anchor.thickness = 0;
        texture.addControl(anchor);
        this.#anchor = anchor;

        //line connects the anchor with the message box
        const line = new Line("gui_line");
        line.isVisible = false;
        line.lineWidth = LineWidth;
        line.color = "orange"; //TODO: use css
        texture.addControl(line);
        this.#line = line;

        //box is the root container for the description
        const box = new Rectangle("gui_messagebox");
        box.isVisible = false;
        box.isPointerBlocker = true; //needed for dragging
        box.adaptHeightToChildren = true;
        box.width = MessageBoxWidth;
        box.left = 100; //px
        box.top = 100; //px
        box.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        box.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        box.cornerRadius = MessageBoxCornerRadius;
        box.thickness = MessageBoxThickness;
        box.color = "orange"; //TODO: use css
        box.background = "white";
        texture.addControl(box);
        this.#messageBox = box;
        //connect line to message box
        line.connectedControl = box;

        //Vertical StackPanel ordering items inside message box
        const stack = new StackPanel("gui_stack");
        stack.isVertical = true;
        stack.paddingLeft = MessageBoxPadding;
        stack.paddingRight = MessageBoxPadding;
        stack.paddingBottom = MessageBoxPadding;
        stack.color = "black"; //font color //TODO: use css
        box.addControl(stack);

        //header is the container for title + close button
        const header = new Grid("gui_header");
        header.height = HeaderHeight;
        header.addColumnDefinition(1);
        header.addColumnDefinition(50, true);
        header.addRowDefinition(1);
        stack.addControl(header);

        //title holds the name of the selected object
        const title = new TextBlock("gui_title");
        title.resizeToFit = true;
        title.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        title.fontWeight = TitleWeight;
        header.addControl(title, 0, 0);
        this.#title = title;

        //close button closes the description
        const closeButton = Button.CreateSimpleButton("gui_closeButton", "X");
        const desc: Description = this; //cant use this in lambda
        closeButton.onPointerUpObservable.add(() => desc.clear());
        header.addControl(closeButton, 0, 1);

        //Separator for separating header from the rest
        const separator = new Rectangle("gui_separator");
        separator.width = 1;
        separator.height = SeparatorHeight;
        separator.cornerRadius = 5;
        separator.background = "orange"; //TODO: use css
        stack.addControl(separator);
        this.#separator = separator;

        //text
        const text = new TextBlock("gui_description");
        text.resizeToFit = true;
        text.paddingTop = MessageBoxPadding;
        text.fontSize = TextSize;
        text.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        text.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        stack.addControl(text);
        this.#text = text;

        //continually update position to follow animated objects
        scene.onBeforeCameraRenderObservable.add(() => {
            if (this.#handle) {
                anchor.moveToVector3(this.#handle.position, this.#scene);
                line.moveToVector3(this.#handle.position, this.#scene);
            }
        });

        /************************ Message Box Dragging ************************/

        //variables needed for dragging
        let isDragging = false;
        let startX = NaN, startY = NaN;

        box.onPointerDownObservable.add((data) => {
            startX = parseFloat(box.left as string) - data.x;
            startY = parseFloat(box.top as string) - data.y;
            isDragging = true;
            helper.zIndex = 9000; //bring helper on top
        });
        box.onPointerUpObservable.add(() => {
            isDragging = false;
            helper.zIndex = -1; //take helper to the back
        });
        helper.onPointerMoveObservable.add((data) => {
            if (!isDragging)
                return false;

            box.left = startX + data.x;
            box.top = startY + data.y;
        });
    }

    /**
     * Shows a message box containing the meta information of object specified
     * via its handle
     * @param handle Handle to the object
     */
    showDescription(handle: ObjectHandle) {
        this.#handle = handle;

        //remove last one
        this.#engine.removeText(this.#text);
        //add new one
        this.#title.text = handle.name;
        this.#engine.addText(this.#text, handle.description);

        //hide description if there is none
        if (handle.description.length == 0) {
            this.#text.isVisible = false;
            this.#separator.isVisible = false;
        }
        else {
            this.#text.isVisible = true;
            this.#separator.isVisible = true;
        }

        //show rest
        this.#anchor.isVisible = true;
        this.#line.isVisible = true;
        this.#messageBox.isVisible = true;

        this.#line.moveToVector3(handle.position, this.#scene);
        this.#anchor.moveToVector3(handle.position, this.#scene);
    }

    /**
     * Closes the description box
     */
    clear() {
        this.#handle = undefined;

        this.#anchor.isVisible = false;
        this.#line.isVisible = false;
        this.#messageBox.isVisible = false;

        this.#engine.removeText(this.#text);
    }
}
