import "@babylonjs/core/Animations/animatable";

import { Animation } from "@babylonjs/core/Animations/animation";
import { AnimationGroup } from "@babylonjs/core/Animations/animationGroup";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Node } from "@babylonjs/core/node";
import { Scene } from "@babylonjs/core/scene";
import { Observable } from "@babylonjs/core/Misc/observable";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";

import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { Rectangle } from "@babylonjs/gui/2D/controls/rectangle";

import { GpuPickingService } from "../input/gpuPicking";
import { TextEngine } from "../interpolation/textEngine";
import { Project } from "../model/project";
import { Description } from "./components/description";
import { buildGrid } from "./components/grid";
import { createOrientationViewScene } from "./components/orientationView";
import { PathVisualizer } from "./components/pathVisualizer";
import { buildCamera } from "./objects/camera";
import { LineAnimatible, LineBuilder } from "./objects/line";
import { ObjectHandle, SceneBuildTool } from "./objects/tools";
import { OverlayAnimatible, OverlayBuilder } from "./objects/overlay";
import { PrismAnimatible, PrismBuilder } from "./objects/prism";
import { SphereAnimatible, SphereBuilder } from "./objects/sphere";
import { TubeAnimatible, TubeController } from "./objects/tube";
import { ColorMapController } from "./materials/colormapController";

export interface SceneContainer {
    animation: AnimationGroup
    isStatic: boolean

    scene: Scene
    camera: ArcRotateCamera
    handles: Array<ObjectHandle>

    colorMapController: ColorMapController

    indicatorLayer: Scene
    grid: Node
    pathVisualizer: PathVisualizer

    overlayRoot: Rectangle
    overlayTexture: AdvancedDynamicTexture
    picking: GpuPickingService
    textEngine: TextEngine
    description: Description

    onAnimationTick: Observable<{currentFrame: number}>
}

export function buildScene(project: Project, engine: Engine): SceneContainer {
    //create build tool
    const buildTool = new SceneBuildTool(project, engine);

    //create camera
    const camera = buildCamera(buildTool, project.camera);
    //create light that always shines from behind the camera
    const dir = camera.position.subtract(camera.target);
    const light = new HemisphericLight("light", dir, buildTool.scene);
    camera.onViewMatrixChangedObservable.add(() => {
        camera.position.subtractToRef(camera.target, light.direction);
    });


    //create objects
    //  The order in which the objects are created must be the same as in Project!
    //  Otherwise the ids will not match

    const lineBuilder = new LineBuilder(buildTool);
    const overlayBuilder = new OverlayBuilder(buildTool);
    const prismBuilder = new PrismBuilder(buildTool);
    const sphereBuilder = new SphereBuilder(buildTool);
    const tubes: TubeController[] = [];

    const handles = new Array<ObjectHandle>(project.animatibles.length);

    //iterate over all animatibles
    for (const [index, animatible] of project.animatibles.entries()) {
        // Unknown type of animatible -> ignore
        if (!animatible.instance)
            continue;

        //check instance type
        switch(animatible.instance.$case) {
        case "prism":
            handles[index] = prismBuilder.build(animatible as PrismAnimatible, index);
            break;
        case "sphere":
            handles[index] = sphereBuilder.build(animatible as SphereAnimatible, index);
            break;
        case "line":
            handles[index] = lineBuilder.build(animatible as LineAnimatible, index);
            break;
        case "tube":
        {
            const tube = new TubeController(buildTool, animatible as TubeAnimatible, index);
            tubes.push(tube);
            handles[index] = tube;
            break;
        }
        case "overlay":
            handles[index] = overlayBuilder.build(animatible as OverlayAnimatible);
            break;
        }
    }

    //finish builders
    lineBuilder.finish();
    sphereBuilder.finish();
    prismBuilder.finish();

    //set animation speed
    let ratio = project.meta?.speedRatio ?? 1.0;
    if (ratio <= 0.0)
        ratio = 1.0;
    buildTool.animationGroup.speedRatio = ratio;

    //We must ensure that there is at least one animation as often times the
    //first animation in the group is accessed for the current frame number
    //TODO: Somehow, the following will always be false!?
    //const isStatic = buildTool.animationGroup.animatables.length == 0
    const isStatic = false;
    //if (isStatic) {
    {//For now always add empty animation...
        const node = new TransformNode("master", buildTool.scene);
        const anim = new Animation("masterAnimation", "scalingDeterminant", 1.0,
            Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
        anim.setKeys([{ frame: 0.0, value: 0.0 }, { frame: 1.0, value: 0.0 }]);
        buildTool.animationGroup.addTargetedAnimation(anim, node);
    }

    //normalize animations
    buildTool.animationGroup.normalize(
        project.meta?.startTime, project.meta?.endTime);

    //create components
    const description = new Description(
        buildTool.overlayTexture, buildTool.scene, buildTool.textEngine);
    const grid = buildGrid(buildTool.scene);
    const indicator = createOrientationViewScene(engine, camera);

    //create observables
    const onAnimationTickObservable = new Observable<{currentFrame: number}>();

    //we handle ui ourselves
    buildTool.scene.detachControl();

    //create container
    const container: SceneContainer = {
        animation: buildTool.animationGroup,
        isStatic: isStatic,
        scene: buildTool.scene,
        camera: camera,
        handles: handles,
        colorMapController: buildTool.cmapController,
        indicatorLayer: indicator,
        grid: grid,
        pathVisualizer: new PathVisualizer(buildTool.scene, project),
        overlayRoot: overlayBuilder.rootContainer,
        overlayTexture: buildTool.overlayTexture,
        picking: buildTool.picking,
        textEngine: buildTool.textEngine,
        description: description,
        onAnimationTick: onAnimationTickObservable
    };

    //render logic
    engine.runRenderLoop(() => {
        container.scene.render();
        container.indicatorLayer.render();
    });
    let lastFrame = NaN;
    buildTool.scene.registerBeforeRender(() => {
        const currentFrame = container.animation.animatables[0].masterFrame;
        const dirty = container.animation.isPlaying || lastFrame != currentFrame;
        //update needed?
        if (dirty) {
            //update tubes
            tubes.forEach(tube => {
                if (tube.visible)
                    tube.update(currentFrame);
            });
            //notify observers
            onAnimationTickObservable.notifyObservers({
                currentFrame: currentFrame
            });
        }
        //update text if needed
        if (dirty || container.textEngine.isDirty) {
            container.textEngine.update(currentFrame);
        }
        //update frame
        lastFrame = currentFrame;
    });

    //done
    return container;
}
