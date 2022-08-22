import {
    Camera,
    Color3,
    Engine,
    Mesh,
    MeshBuilder,
    Quaternion,
    Scene,
    StandardMaterial,
    TargetCamera,
    Texture,
    TransformNode,
    Vector3
} from "@babylonjs/core";

// Orientation view is a independent scene showing the orientation of a given
// camera/scene

const CameraSideLength: number = 10
const XColor = new Color3(1, 0.255, 0.212)
const YColor = new Color3(0.18, 0.8, 0.251)
const ZColor = new Color3(0, 0.42, 0.78)

export function createOrientationViewScene(engine: Engine, source: Camera): Scene {
    const builder = new IndicatorBuilder(engine, source)
    return builder.scene
}

class IndicatorBuilder {
    scene: Scene
    engine: Engine
    camera: TargetCamera
    source: Camera
    root: TransformNode
    buttons: Array<Mesh>

    #rotation: Quaternion
    #inverse: Quaternion

    constructor(engine: Engine, source: Camera) {
        this.engine = engine
        this.source = source
        this.#rotation = new Quaternion()
        this.#inverse = new Quaternion()

        //Create separate scene (-> allows to toggle this control)
        this.scene = new Scene(engine)
        this.scene.autoClear = false //Otherwise already drawn stuff gets erased

        //Create camera
        this.camera = new TargetCamera("orientationViewCamera",
            new Vector3(0, 0, -10), this.scene)
        this.camera.target = Vector3.Zero()
        this.camera.mode = Camera.ORTHOGRAPHIC_CAMERA
        this.camera.upVector = new Vector3(0,0,1)
        this.camera.orthoTop = CameraSideLength
        this.camera.orthoBottom = -CameraSideLength

        //Create root transform node
        this.root = new TransformNode("root", this.scene)
        //create indicator object
        this.buttons = new Array<Mesh>()
        this.createIndicatorObject()

        //scale and position
        this.root.scalingDeterminant = 0.2
        this.root.position = new Vector3(0.85 * CameraSideLength, 0.85 * CameraSideLength, 0)

        //wire up cameras
        this.updateAspectRatio()
        this.updateRotation()
    }

    updateAspectRatio() {
        //local alias (since the lambda looses the class' this)
        const engine = this.engine
        const camera = this.camera
        const root = this.root

        const update = function() {
            const ratio = CameraSideLength * engine.getAspectRatio(camera)
            //update camera
            camera.orthoLeft = -ratio
            camera.orthoRight = ratio
            //update position
            root.position.x = 0.9 * ratio
        }
        
        update()
        this.engine.onResizeObservable.add(update)
    }

    updateRotation() {
        //local alias
        const source = this.source
        const root = this.root
        const buttons = this.buttons
        
        let rotation = new Quaternion()
        let inverse = new Quaternion()

        const update = function() {
            //update rotations
            source.getViewMatrix().decompose(
                undefined, rotation, undefined, undefined)
            root.rotationQuaternion = rotation
            //rotate planes locally in opposite direction to still face the camera
            inverse.copyFrom(rotation)
            inverse.invertInPlace()
            buttons.forEach(b => b.rotationQuaternion = inverse)
        }

        update()
        this.source.onViewMatrixChangedObservable.add(update)
    }

    createIndicatorObject() {    
        //x axis
        this.createButton('x', new Vector3(4,0,0),
            './src/assets/textures/x.png',
            './src/assets/textures/x_hover.png')
        this.createButton('nx', new Vector3(-4,0,0),
            './src/assets/textures/negx.png',
            './src/assets/textures/negx_hover.png')
    
        //y axis
        this.createButton('y', new Vector3(0,4,0),
            './src/assets/textures/y.png',
            './src/assets/textures/y_hover.png')
        this.createButton('ny', new Vector3(0,-4,0),
            './src/assets/textures/negy.png',
            './src/assets/textures/negy_hover.png')
    
        //z axis
        this.createButton('z', new Vector3(0,0,4),
            './src/assets/textures/z.png',
            './src/assets/textures/z_hover.png')
        this.createButton('nz', new Vector3(0,0,-4),
            './src/assets/textures/negz.png',
            './src/assets/textures/negz_hover.png')
    
        //axis lines
        this.createAxis('xAxis', new Vector3(3.5,0,0), XColor)
        this.createAxis('yAxis', new Vector3(0,3.5,0), YColor)
        this.createAxis('zAxis', new Vector3(0,0,3.5), ZColor)  
    }

    createButton(
        name: string,
        position: Vector3,
        defaultTexture: string,
        hoverTexture: string)
    {
        const defaultMat = loadTexture(defaultTexture, this.scene)
        //const hoverMat = loadTexture(hoverTexture, this.scene)
    
        const button = MeshBuilder.CreatePlane(name, {
                width: 2,
                height: 2,
                sideOrientation: Mesh.DOUBLESIDE }, //TODO: One side is enough
            this.scene)
        button.position = position
        button.material = defaultMat
        button.parent = this.root

        this.buttons.push(button)
    
        //TODO: Interactive stuff
    }

    createAxis(name: string, to: Vector3, color: Color3) {
        const mat = new StandardMaterial(name + '_mat')
        mat.emissiveColor = color
    
        const axis = MeshBuilder.CreateTube(name, {
            path: [ Vector3.Zero(), to],
            tessellation: 3,
            radius: 0.1
        }, this.scene)
        axis.material = mat
        axis.parent = this.root
    }
}

function loadTexture(path: string, scene: Scene): StandardMaterial {
    //load texture
    const tex = new Texture(path, scene)
    tex.hasAlpha = true

    //create material
    const mat = new StandardMaterial('', scene)
    mat.emissiveTexture = tex
    mat.diffuseTexture = tex

    //done
    return mat
}
