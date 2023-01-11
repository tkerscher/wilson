import { DivideBlock } from "@babylonjs/core/Materials/Node/Blocks/divideBlock";
import { FragmentOutputBlock } from "@babylonjs/core/Materials/Node/Blocks/Fragment/fragmentOutputBlock";
import { InstancesBlock } from "@babylonjs/core/Materials/Node/Blocks/Vertex/instancesBlock";
import { InputBlock } from "@babylonjs/core/Materials/Node/Blocks/Input/inputBlock";
import { LightBlock } from "@babylonjs/core/Materials/Node/Blocks/Dual/lightBlock";
import { NodeMaterialSystemValues } from "@babylonjs/core/Materials/Node/Enums/nodeMaterialSystemValues";
import { NodeMaterial } from "@babylonjs/core/Materials/Node/nodeMaterial";
import { NormalizeBlock } from "@babylonjs/core/Materials/Node/Blocks/normalizeBlock";
import { Scene } from "@babylonjs/core/scene";
import { SubtractBlock } from "@babylonjs/core/Materials/Node/Blocks/subtractBlock";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { TextureBlock } from "@babylonjs/core/Materials/Node/Blocks/Dual/textureBlock";
import { TransformBlock } from "@babylonjs/core/Materials/Node/Blocks/transformBlock";
import { VectorMergerBlock } from "@babylonjs/core/Materials/Node/Blocks/vectorMergerBlock";
import { VertexOutputBlock } from "@babylonjs/core/Materials/Node/Blocks/Vertex/vertexOutputBlock";

import { ColorMapController } from "./colormapController";

export function createTextureMappedColorMaterial(
    scene: Scene,
    controller: ColorMapController,
    texture: Texture
): NodeMaterial
{
    /******************************** Instancing ******************************/

    //Inputs
    const position = new InputBlock("position");
    position.setAsAttribute("position");
    const normal = new InputBlock("normal");
    normal.setAsAttribute("normal");
    const world0 = new InputBlock("world0");
    world0.setAsAttribute("world0");
    const world1 = new InputBlock("world1");
    world1.setAsAttribute("world1");
    const world2 = new InputBlock("world2");
    world2.setAsAttribute("world2");
    const world3 = new InputBlock("world3");
    world3.setAsAttribute("world3");
    const world = new InputBlock("world");
    world.setAsSystemValue(NodeMaterialSystemValues.World);

    //Instance Block
    const instances = new InstancesBlock("instances");
    world.output.connectTo(instances.world);
    world0.output.connectTo(instances.world0);
    world1.output.connectTo(instances.world1);
    world2.output.connectTo(instances.world2);
    world3.output.connectTo(instances.world3);

    //World Position Transformation
    const worldPosition = new TransformBlock("worldPosition");
    position.output.connectTo(worldPosition.vector);
    instances.output.connectTo(worldPosition.transform);

    //World Normal Transformation
    const worldNormal = new TransformBlock("worldNormal");
    normal.output.connectTo(worldNormal.vector);
    instances.output.connectTo(worldNormal.transform);
    const normalizedWorldNormal = new NormalizeBlock("normalizedWorldNormal");
    worldNormal.output.connectTo(normalizedWorldNormal.input);

    /******************************* Vertex Output ****************************/

    //Inputs
    const viewXProjection = new InputBlock("viewXProjection");
    viewXProjection.setAsSystemValue(NodeMaterialSystemValues.ViewProjection);

    //Ouput
    const vertexOutput = new VertexOutputBlock("vertexOutput");

    //view transformation
    const projectedPosition = new TransformBlock("projectedPosition");
    worldPosition.output.connectTo(projectedPosition.vector);
    viewXProjection.output.connectTo(projectedPosition.transform);
    projectedPosition.output.connectTo(vertexOutput.vector);

    /****************************** Mapped Scalar *****************************/

    //Inputs
    const uvInput = new InputBlock("uvInput");
    uvInput.setAsAttribute("uv");
    const minScalar = new InputBlock("minScalar");
    minScalar.visibleInInspector = true;
    minScalar.value = controller.minScalar;
    controller.onMinScalarChanged.add((value: number) => minScalar.value = value);
    const maxScalar = new InputBlock("maxScalar");
    maxScalar.visibleInInspector = true;
    maxScalar.value = controller.maxScalar;
    controller.onMaxScalarChanged.add((value: number) => maxScalar.value = value);

    //Texture
    const scalarTexture = new TextureBlock("scalarTexture");
    scalarTexture.texture = texture;
    uvInput.output.connectTo(scalarTexture.uv);

    //Normalizing Scalar
    const mapOffset = new SubtractBlock("mapOffset");
    scalarTexture.r.connectTo(mapOffset.left);
    minScalar.output.connectTo(mapOffset.right);
    const mapLength = new SubtractBlock("mapLength");
    maxScalar.output.connectTo(mapLength.left);
    minScalar.output.connectTo(mapLength.right);
    const normalizedScalar = new DivideBlock("normalizedScalar");
    mapOffset.output.connectTo(normalizedScalar.left);
    mapLength.output.connectTo(normalizedScalar.right);

    /***************************** Color Map Lookup ***************************/

    //Consts
    const half = new InputBlock("half");
    half.value = 0.5;
    half.isConstant = true;

    //UV vector creation
    const textureCoord = new VectorMergerBlock("textureCoord");
    normalizedScalar.output.connectTo(textureCoord.x);
    half.output.connectTo(textureCoord.y);

    //texture
    const colorMap = new TextureBlock("colorMap");
    textureCoord.xyOut.connectTo(colorMap.uv);
    colorMap.texture = controller.texture;

    /****************************** Fragment Output ***************************/

    //Camera Position
    const cameraPosition = new InputBlock("cameraPosition");
    cameraPosition.setAsSystemValue(NodeMaterialSystemValues.CameraPosition);

    //Lights
    const lights = new LightBlock("light");
    worldPosition.output.connectTo(lights.worldPosition);
    normalizedWorldNormal.output.connectTo(lights.worldNormal);
    cameraPosition.output.connectTo(lights.cameraPosition);
    colorMap.rgb.connectTo(lights.diffuseColor);

    //fragment output
    const fragmentOutput = new FragmentOutputBlock("fragmentOutput");
    colorMap.a.connectTo(fragmentOutput.a);
    lights.diffuseOutput.connectTo(fragmentOutput.rgb);

    /********************************** Finish ********************************/

    const material = new NodeMaterial("texturedMappedColor_" + texture.name, scene);
    material.backFaceCulling = true;
    material.needDepthPrePass = true;
    material.addOutputNode(vertexOutput);
    material.addOutputNode(fragmentOutput);
    material.build();

    return material;
}
