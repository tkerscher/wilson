import { Color4 } from "@babylonjs/core/Maths/math.color";
import { ColorSplitterBlock } from "@babylonjs/core/Materials/Node/Blocks/colorSplitterBlock";
import { FragmentOutputBlock } from "@babylonjs/core/Materials/Node/Blocks/Fragment/fragmentOutputBlock";
import { InstancesBlock } from "@babylonjs/core/Materials/Node/Blocks/Vertex/instancesBlock";
import { InputBlock } from "@babylonjs/core/Materials/Node/Blocks/Input/inputBlock";
import { LightBlock } from "@babylonjs/core/Materials/Node/Blocks/Dual/lightBlock";
import { NodeMaterialSystemValues } from "@babylonjs/core/Materials/Node/Enums/nodeMaterialSystemValues";
import { NodeMaterial } from "@babylonjs/core/Materials/Node/nodeMaterial";
import { NormalizeBlock } from "@babylonjs/core/Materials/Node/Blocks/normalizeBlock";
import { Scene } from "@babylonjs/core/scene";
import { TransformBlock } from "@babylonjs/core/Materials/Node/Blocks/transformBlock";
import { VertexOutputBlock } from "@babylonjs/core/Materials/Node/Blocks/Vertex/vertexOutputBlock";

export function createSolidColorMaterial(scene: Scene, color: Color4) {
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
    /****************************** Fragment Output ***************************/

    //Inputs
    const colorIn = new InputBlock("colorIn");
    colorIn.value = color;
    colorIn.isConstant = true;
    colorIn.visibleInInspector = true;

    //Camera Position
    const cameraPosition = new InputBlock("cameraPosition");
    cameraPosition.setAsSystemValue(NodeMaterialSystemValues.CameraPosition);

    //Color Splitter
    const colorSplitter = new ColorSplitterBlock("colorSplitter");
    colorIn.output.connectTo(colorSplitter.rgba);

    //Lights
    const lights = new LightBlock("light");
    worldPosition.output.connectTo(lights.worldPosition);
    normalizedWorldNormal.output.connectTo(lights.worldNormal);
    cameraPosition.output.connectTo(lights.cameraPosition);
    colorSplitter.rgbOut.connectTo(lights.diffuseColor);

    //fragment output
    const fragmentOutput = new FragmentOutputBlock("fragmentOutput");
    colorSplitter.a.connectTo(fragmentOutput.a);
    lights.diffuseOutput.connectTo(fragmentOutput.rgb);

    /********************************** Finish ********************************/

    const material = new NodeMaterial("solidColor", scene);
    material.backFaceCulling = true;
    material.needDepthPrePass = true;
    material.addOutputNode(vertexOutput);
    material.addOutputNode(fragmentOutput);
    material.build();
    material.freeze();

    return material;
}
