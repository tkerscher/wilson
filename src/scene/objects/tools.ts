import { Animation } from "@babylonjs/core/Animations/animation";
import { AnimationGroup } from "@babylonjs/core/Animations/animationGroup";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Engine } from "@babylonjs/core/Engines/engine";
import { IAnimationKey } from "@babylonjs/core/Animations/animationKey";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Node } from "@babylonjs/core/node";
import { Scene } from "@babylonjs/core/scene";
import { Material } from "@babylonjs/core/Materials/material";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { NodeMaterial } from "@babylonjs/core/Materials/Node/nodeMaterial";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";

import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { Control } from "@babylonjs/gui/2D/controls/control";

import { Project } from "../../model/project";
import { ColorProperty, ScalarProperty, VectorProperty } from "../../model/properties";
import { getInterpolation } from "../../interpolation/functions";
import { setProperty } from "../../util/property";
import { toHex } from "../../util/color";
import { TextEngine } from "../../interpolation/textEngine";
import { interpolateColormap } from "../../util/color";
import { createSolidMappedColorMaterial } from "../materials/solidMappedColorMaterial";
import { ColorMapController } from "../materials/colormapController";
import { Color } from "../../model/color";

const BackgroundColor = new Color4(0.239, 0.239, 0.239, 1.0);

export interface Metadata {
    name: string
    description: string
}

export function isMetadata(obj: any): obj is Metadata {
    //TODO: should I check types?
    return "name" in obj && "description" in obj;
}

/**
 * Stateful helper class providing functions for common tasks during scene
 * building as well as bundling common variables
 */
export class SceneBuildTool {
    animationGroup: AnimationGroup;
    scene: Scene;

    overlayTexture: AdvancedDynamicTexture;
    textEngine: TextEngine;

    project: Project;
    #nextId = 0;
    objectMap: Map<number, Node|Control>;

    colorMapController: ColorMapController;
    #solidMappedColorMaterial: NodeMaterial;
    #updateScalar: (value: number) => void;

    #materialMap: Map<string, Material>;
    defaultMaterial: StandardMaterial;

    constructor(project: Project, engine: Engine) {
        this.project = project;
        this.scene = new Scene(engine);
        this.animationGroup = new AnimationGroup("animationGroup", this.scene);

        this.objectMap = new Map<number,Node|Control>();

        this.colorMapController = new ColorMapController(this.scene, project.colormap);
        const _solidMat = createSolidMappedColorMaterial(this.scene, this.colorMapController);
        this.#solidMappedColorMaterial = _solidMat.material;
        this.#updateScalar = _solidMat.updateScalar;

        this.#materialMap = new Map<string, Material>();
        this.defaultMaterial = new StandardMaterial("default");
        this.defaultMaterial.diffuseColor = Color3.Black();
        this.defaultMaterial.freeze();

        this.overlayTexture = AdvancedDynamicTexture.CreateFullscreenUI("GUI", true, this.scene);
        this.textEngine = new TextEngine(this.project);

        this.scene.clearColor = BackgroundColor;
    }

    /**
     * Sets common metadata on the given object
     * @param obj The object to apply the metadata
     * @param meta The metadata to apply
     */
    applyMetadata(obj: Node|Control, meta: Metadata) {
        obj.uniqueId = this.#nextId++;
        obj.metadata = meta;

        this.objectMap.set(obj.uniqueId, obj);
    }

    /**
     * Changes the state as if an object has been processed, e.g. skip the
     * current id.
     */
    skipObject(): void {
        this.#nextId++;
    }

    /**
     * Processes a given scalar property and either creates a corresponding
     * animation if needed or sets the static value encoded into it.
     * @param scalar Scalar property to parse
     * @param target Target on which to apply property
     * @param property Which property to set
     */
    parseScalar(scalar: ScalarProperty|undefined, target: any, property: string): void {
        if (!scalar || !scalar.source) {
            return setProperty(target, property, 0.0);
        }

        switch (scalar.source.$case) {
        case "constValue":
            return setProperty(target, property, scalar.source.constValue);
        case "graphId":
        {
            const id = scalar.source.graphId;
            const graph = this.project.graphs.find(g => g.id == id);
            if (!graph || graph.points.length == 0) {
                //Referenced graph not found -> return default
                return setProperty(target, property, 0.0);
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
                return;
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
     */
    parseVector(vector: VectorProperty|undefined, target: any, property: string): void {
        if (!vector || !vector.source) {
            return setProperty(target, property, new Vector3());
        }

        switch (vector.source.$case) {
        case "constValue":
        {
            const p = vector.source.constValue;
            return setProperty(target, property, new Vector3(p.x, p.y, p.z));
        }
        case "pathId":
        {
            const id = vector.source.pathId;
            const path = this.project.paths.find(p => p.id == id);
            if (!path || path.points.length == 0) {
                //Referenced path not found -> return default
                return setProperty(target, property, new Vector3());
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
                return;
            }
        }
        }
    }

    /**
     * Creates the material corresponding to the given color property and
     * assigns it to the given target. Creates animation if needed.
     * @param target Target to apply the material
     * @param color Color property to apply
     */
    applyMaterial(target: Mesh, color: ColorProperty|undefined): void {
        if (!color || !color.source) {
            target.material = this.defaultMaterial;
            return;
        }
        const update = this.#updateScalar;

        switch(color.source.$case) {
        case "constValue":
        {
            const clr = color.source.constValue;
            target.material = this.#getStaticMaterial(clr);
            return;
        }
        case "scalarValue":
        {
            const scalar = color.source.scalarValue;
            //TODO: Figure out why this is not working
            // target.onBeforeRenderObservable.add(() => update(scalar));
            // target.material = this.#solidMappedColorMaterial;
            const foo = createSolidMappedColorMaterial(this.scene, this.colorMapController);
            target.material = foo.material;
            foo.updateScalar(scalar);
            foo.material.freeze();
            return;
        }
        case "graphId":
        {
            const id = color.source.graphId;
            const graph = this.project.graphs.find(g => g.id == id);
            if (!graph || graph.points.length == 0) {
                //Referenced graph not found -> return default
                target.material = this.defaultMaterial;
                return;
            }
            else if (graph.points.length == 1) {
                const scalar = graph.points[0].value;
                target.onBeforeRenderObservable.add(() => update(scalar));
                target.material = this.#solidMappedColorMaterial;
                return;
            }
            else {
                const scalarAnimation = new Animation(graph.name, "value", 1.0,
                    Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
                scalarAnimation.setKeys(graph.points.map(p =>
                    ({ frame: p.time, value: p.value } as IAnimationKey)));

                const interpolation = getInterpolation(graph.interpolation);
                scalarAnimation.setEasingFunction(interpolation);

                //wire up animation
                const animationTarget = { value: 0.0 };
                this.animationGroup.addTargetedAnimation(scalarAnimation, animationTarget);
                target.onBeforeRenderObservable.add(() => update(animationTarget.value));
                target.material = this.#solidMappedColorMaterial;

                return;
            }
        }
        }
    }

    /**
     * Returns a material with the specified color. Reuses already created ones
     * to improve render performance
     * @param color Color of the material
     * @returns Material with the given color
     */
    #getStaticMaterial(color: Color): Material {
        //color already in use?
        const key = toHex(color);
        const mat = this.#materialMap.get(key);
        if (mat) {
            return mat;
        }
        else {
            //create new material
            const mat = new StandardMaterial(key, this.scene);
            mat.diffuseColor = new Color3(color.r, color.g, color.b);
            mat.alpha = color.a;
            mat.freeze(); //improves performance for static materials
            //store it
            this.#materialMap.set(key, mat);
            //done
            return mat;
        }
    }
}
