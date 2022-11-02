import { Camera } from "@babylonjs/core/Cameras/camera";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Quaternion, Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { TargetCamera } from "@babylonjs/core/Cameras/targetCamera";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";

//import assets to get mangled url in production
import xUrl from '../../assets/textures/x.png';
import yUrl from '../../assets/textures/y.png';
import zUrl from '../../assets/textures/z.png';

import xHoverUrl from '../../assets/textures/x_hover.png';
import yHoverUrl from '../../assets/textures/y_hover.png';
import zHoverUrl from '../../assets/textures/z_hover.png';

import negXUrl from '../../assets/textures/negx.png';
import negYUrl from '../../assets/textures/negy.png';
import negZUrl from '../../assets/textures/negz.png';

import negXHoverUrl from '../../assets/textures/negx_hover.png';
import negYHoverUrl from '../../assets/textures/negy_hover.png';
import negZHoverUrl from '../../assets/textures/negz_hover.png';

// Orientation view is a independent scene showing the orientation of a given
// camera/scene

const CameraSideLength = 10;
const XColor = new Color3(1, 0.255, 0.212);
const YColor = new Color3(0.18, 0.8, 0.251);
const ZColor = new Color3(0, 0.42, 0.78);

export function createOrientationViewScene(engine: Engine, source: Camera): Scene {
    const builder = new IndicatorBuilder(engine, source);
    return builder.scene;
}

class IndicatorBuilder {
    scene: Scene;
    engine: Engine;
    camera: TargetCamera;
    source: Camera;
    root: TransformNode;
    buttons: Array<Mesh>;

    #buttonZeroRotation = Quaternion.FromEulerAngles(Math.PI, -Math.PI / 2, 0);

    constructor(engine: Engine, source: Camera) {
        this.engine = engine;
        this.source = source;

        //Create separate scene (-> allows to toggle this control)
        this.scene = new Scene(engine);
        this.scene.autoClear = false; //Otherwise already drawn stuff gets erased

        //Create camera
        this.camera = new TargetCamera("orientationViewCamera",
            new Vector3(0, 0, -10), this.scene);
        this.camera.target = Vector3.Zero();
        this.camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        this.camera.upVector = new Vector3(0,0,1);
        this.camera.orthoTop = CameraSideLength;
        this.camera.orthoBottom = -CameraSideLength;

        //Create root transform node
        this.root = new TransformNode("root", this.scene);
        //create indicator object
        this.buttons = new Array<Mesh>();
        this.createIndicatorObject();

        //scale and position
        this.root.scalingDeterminant = 0.2;
        this.root.position = new Vector3(0.85 * CameraSideLength, CameraSideLength - 1.2, 0);

        //wire up cameras
        this.updateAspectRatio();
        this.updateRotation();
    }

    updateAspectRatio() {
        //local alias (since the lambda looses the class' this)
        const engine = this.engine;
        const camera = this.camera;
        const root = this.root;

        const update = function() {
            const ratio = CameraSideLength * engine.getAspectRatio(camera);
            //update camera
            camera.orthoLeft = -ratio;
            camera.orthoRight = ratio;
            //update position
            root.position.x = ratio - 1.2;
        };
        
        update();
        this.engine.onResizeObservable.add(update);
    }

    updateRotation() {
        //local alias
        const source = this.source;
        const root = this.root;
        const buttons = this.buttons;
        const zero = this.#buttonZeroRotation;
        
        const rotation = new Quaternion();
        const inverse = new Quaternion();

        const update = function() {
            //update rotations
            source.getViewMatrix().decompose(
                undefined, rotation, undefined, undefined);
            root.rotationQuaternion = rotation;
            //rotate planes locally in opposite direction to still face the camera
            inverse.copyFrom(rotation);
            inverse.invertInPlace();
            inverse.multiplyInPlace(zero);
            buttons.forEach(b => b.rotationQuaternion = inverse);
        };

        update();
        this.source.onViewMatrixChangedObservable.add(update);
    }

    createIndicatorObject() {    
        //x axis
        this.createButton('x', new Vector3(4,0,0), xUrl, xHoverUrl);
        this.createButton('nx', new Vector3(-4,0,0), negXUrl, negXHoverUrl);
    
        //y axis
        this.createButton('y', new Vector3(0,4,0), yUrl, yHoverUrl);
        this.createButton('ny', new Vector3(0,-4,0), negYUrl, negYHoverUrl);
    
        //z axis
        this.createButton('z', new Vector3(0,0,4), zUrl, zHoverUrl);
        this.createButton('nz', new Vector3(0,0,-4), negZUrl, negZHoverUrl);
    
        //axis lines
        this.createAxis('xAxis', new Vector3(3.5,0,0), XColor);
        this.createAxis('yAxis', new Vector3(0,3.5,0), YColor);
        this.createAxis('zAxis', new Vector3(0,0,3.5), ZColor);  
    }

    createButton(
        name: string,
        position: Vector3,
        defaultTexture: string,
        hoverTexture: string)
    {
        const defaultMat = loadTexture(defaultTexture, this.scene);
        //const hoverMat = loadTexture(hoverTexture, this.scene)

        const button = MeshBuilder.CreateSphere(name, {
            diameter: 2.0,
            segments: 16
        }, this.scene);
        button.position = position;
        button.material = defaultMat;
        button.parent = this.root;
        button.rotationQuaternion = this.#buttonZeroRotation;

        this.buttons.push(button);
    
        //TODO: Interactive stuff
    }

    createAxis(name: string, to: Vector3, color: Color3) {
        const mat = new StandardMaterial(name + '_mat');
        mat.emissiveColor = color;
        mat.freeze();
    
        const axis = MeshBuilder.CreateTube(name, {
            path: [ Vector3.Zero(), to],
            tessellation: 3,
            radius: 0.1
        }, this.scene);
        axis.material = mat;
        axis.parent = this.root;
    }
}

function loadTexture(path: string, scene: Scene): StandardMaterial {
    //load texture
    const tex = new Texture(path, scene);
    tex.hasAlpha = true;

    //create material
    const mat = new StandardMaterial('', scene);
    mat.emissiveTexture = tex;
    mat.diffuseTexture = tex;
    mat.freeze();

    //done
    return mat;
}
