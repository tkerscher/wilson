import { Animation } from "@babylonjs/core/Animations/animation";
import { AnimationGroup } from "@babylonjs/core/Animations/animationGroup";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";
import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";

import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";

import { Project } from "../../model/project";
import { ColorProperty, ScalarProperty, VectorProperty } from "../../model/properties";
import { getInterpolation } from "../../interpolation/functions";
import { setProperty } from "../../util/property";
import { toHex } from "../../util/colorToHex";
import { TextEngine } from "../../interpolation/textEngine";
import { GpuPickingService } from "../../input/gpuPicking";
import { createSolidColorInstanceMaterial } from "../materials/solidColorInstanceMaterial";

const BackgroundColor = new Color4(0.239, 0.239, 0.239, 1.0);
const DefaultColor = new Color4(0.0, 0.0, 0.0, 1.0);

/**
 * Common interface for all objects created during building.
 * Used for manipulating them.
 */
export interface ObjectHandle {
    name: string
    description: string

    position: Vector3;
    visible: boolean;
}

/**
 * Stateful helper class providing functions for common tasks during scene
 * building as well as bundling common variables
 */
export class SceneBuildTool {
    animationGroup: AnimationGroup;
    scene: Scene;

    overlayTexture: AdvancedDynamicTexture;
    picking: GpuPickingService;
    textEngine: TextEngine;

    project: Project;

    #materialMap: Map<string, StandardMaterial>;
    defaultMaterial: StandardMaterial;

    solidColorInstanceMaterial: ShaderMaterial;

    constructor(project: Project, engine: Engine) {
        this.project = project;
        this.scene = new Scene(engine);
        this.animationGroup = new AnimationGroup("animationGroup", this.scene);

        this.#materialMap = new Map<string, StandardMaterial>();
        this.defaultMaterial = new StandardMaterial("default");
        this.defaultMaterial.diffuseColor = Color3.Black();
        this.defaultMaterial.freeze();

        this.overlayTexture = AdvancedDynamicTexture.CreateFullscreenUI("GUI", true, this.scene);
        this.picking = new GpuPickingService(engine, this.scene, 4);
        this.textEngine = new TextEngine(this.project);

        this.scene.clearColor = BackgroundColor;

        this.solidColorInstanceMaterial = createSolidColorInstanceMaterial(this.scene);
    }

    /**
     * Processes a given scalar property and either creates a corresponding
     * animation if needed or sets the static value encoded into it.
     * @param scalar Scalar property to parse
     * @param target Target on which to apply property
     * @param property Which property to set
     * @returns True, if the property is animated, false otherwise.
     */
    parseScalar(scalar: ScalarProperty|undefined, target: any, property: string): boolean {
        if (!scalar || !scalar.source) {
            setProperty(target, property, 0.0);
            return false;
        }

        switch (scalar.source.$case) {
        case "constValue":
            setProperty(target, property, scalar.source.constValue);
            return false;
        case "graphId":
        {
            const id = scalar.source.graphId;
            const graph = this.project.graphs.find(g => g.id == id);
            if (!graph || graph.points.length == 0) {
                //Referenced graph not found -> return default
                setProperty(target, property, 0.0);
                return false;
            }
            else {
                //create animation based on graph
                const animation = new Animation(graph.name, property, 1.0,
                    Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
                const keyFrames = graph.points.map(p =>
                    ({ frame: p.time, value: p.value }));
                animation.setKeys(keyFrames);
                animation.setEasingFunction(getInterpolation(graph.interpolation));
                this.animationGroup.addTargetedAnimation(animation, target);
                return true;
            }
        }
        }
    }

    /**
     * Processes a given vector property and either creates a corresponding
     * animation if needed or sets the static value encoded into it.
     * @param vector Vector property to parse
     * @param target Target on which to apply property
     * @param property Which property to set
     * @returns True if the property is animated, false otherwise
     */
    parseVector(vector: VectorProperty|undefined, target: any, property: string): boolean {
        if (!vector || !vector.source) {
            setProperty(target, property, new Vector3());
            return false;
        }

        switch (vector.source.$case) {
        case "constValue":
        {
            const p = vector.source.constValue;
            setProperty(target, property, new Vector3(p.x, p.y, p.z));
            return false;
        }
        case "pathId":
        {
            const id = vector.source.pathId;
            const path = this.project.paths.find(p => p.id == id);
            if (!path || path.points.length == 0) {
                //Referenced path not found -> return default
                setProperty(target, property, new Vector3());
                return false;
            }
            else {
                //create animation based on the referenced path
                const animation = new Animation(path.name, property, 1.0,
                    Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
                const keyFrames = path.points.map(p => ({ frame: p.time,
                    value: new Vector3(p.position?.x, p.position?.y, p.position?.z) }));
                animation.setKeys(keyFrames);
                animation.setEasingFunction(getInterpolation(path.interpolation));
                this.animationGroup.addTargetedAnimation(animation, target);
                return true;
            }
        }
        }
    }

    /**
     * Process a given color property and either creates a corresponding
     * animation if needed or sets the static value encoded into it.
     * @param color Color property to parse
     * @param target Target on which to apply property
     * @param property Which property to set
     * @returns True if the property is animated, false otherwise
     */
    parseColor(color: ColorProperty|undefined, target: any, property: string): boolean {
        if (!color || !color.source) {
            setProperty(target, property, DefaultColor);
            return false;
        }

        switch(color.source.$case) {
        case "constValue":
        {
            const c = color.source.constValue;
            setProperty(target, property, new Color4(c.r, c.g, c.b, c.a));
            return false;
        }
        case "scalarValue":
        {
            setProperty(target, property, this.mapColor(color.source.scalarValue));
            return false;
        }
        case "graphId":
        {
            const id = color.source.graphId;
            const graph = this.project.graphs.find(g => g.id == id);
            if (!graph || graph.points.length == 0) {
                setProperty(target, property, DefaultColor);
                return false;
            }
            else {
                const animation = new Animation(graph.name, property, 1.0,
                    Animation.ANIMATIONTYPE_COLOR4, Animation.ANIMATIONLOOPMODE_CYCLE);
                const keyFrames = graph.points.map(p => ({
                    frame: p.time, value: this.mapColor(p.value)
                }));
                animation.setKeys(keyFrames);
                animation.setEasingFunction(getInterpolation(graph.interpolation));
                this.animationGroup.addTargetedAnimation(animation, target);
                return true;
            }
        }
        }
    }

    /**
     * Looks up a color in the color map specified by the project
     * @param scalar Value to look up
     * @returns The corresponding color according to the project's color map
     */
    // mapColor(scalar: number): [Color3,number] {
    mapColor(scalar: number): Color4 {
        if (!this.project.colormap || this.project.colormap.stops.length == 0) {
            return DefaultColor;
        }
        const stops = this.project.colormap.stops;

        //get first stop after scalar
        const stopIdx = stops.findIndex(s => s.value > scalar);
        if (stopIdx == -1) {
            //Clamp top
            const clr = stops[stops.length - 1].color;
            if (!clr) {
                return DefaultColor;
            }
            else {
                return new Color4(clr.r, clr.g, clr.b, clr.a);
            }
        }
        if (stopIdx == 0) {
            //clamp bottom
            const clr = stops[0].color;
            if (!clr) {
                DefaultColor;
            }
            else {
                return new Color4(clr.r, clr.g, clr.b, clr.a);
            }
        }

        //linear interpolate between stops
        const before = stops[stopIdx - 1];
        const after = stops[stopIdx];
        if (!before.color || !after.color) {
            return DefaultColor;
        }
        const lambda = (scalar - before.value) / (after.value - before.value);
        const red = before.color.r + (after.color.r - before.color.r) * lambda;
        const green = before.color.g + (after.color.g - before.color.g) * lambda;
        const blue = before.color.b + (after.color.b - before.color.b) * lambda;
        const alpha = before.color.a + (after.color.a - before.color.a) * lambda;
        return new Color4(red, green, blue, alpha);
    }

    /**
     * Returns a material with the specified color. Reuses already created ones
     * to improve render performance
     * @param r Red channel
     * @param g Blue channel
     * @param b Green channel
     * @param a Alpha channel
     * @returns Material with the given color
     */
    getStaticMaterial(r: number, g: number, b: number, a: number): StandardMaterial {
        //color already in use?
        const key = toHex(r, g, b, a);
        const mat = this.#materialMap.get(key);
        if (mat) {
            return mat;
        }
        else {
            //create new material
            const mat = new StandardMaterial(key, this.scene);
            mat.diffuseColor = new Color3(r, g, b);
            mat.alpha = a;
            mat.freeze(); //improves performance for static materials
            //store it
            this.#materialMap.set(key, mat);
            //done
            return mat;
        }
    }

    /**
     * Checks, wether the given color property has any animation encoded.
     * @param color The color property
     * @returns True, if the color property is static and has no animations
     */
    isStaticMaterial(color: ColorProperty|undefined): boolean {
        if (!color || !color.source)
            return true;

        switch (color.source.$case) {
        case "constValue":
        case "scalarValue":
            return true;
        case "graphId":
        {
            const id = color.source.graphId;
            const graph = this.project.graphs.find(g => g.id == id);
            return !graph || graph.points.length <= 0;
        }}
    }
}
