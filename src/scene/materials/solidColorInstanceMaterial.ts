import { Axis, Vector3 } from "@babylonjs/core/Maths/math";
import { Scene } from "@babylonjs/core/scene";
import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial";
import { ColorMapController } from "./colormapController";

export function createSolidColorInstanceMaterial(scene: Scene, cmap: ColorMapController): ShaderMaterial {
    //create shader
    const material = new ShaderMaterial(
        "solid_color_material", scene,
        {
            vertexSource: `
                #version 300 es
                precision highp float;

                in vec3 position;
                in vec3 normal;

                in vec4 world0;
                in vec4 world1;
                in vec4 world2;
                in vec4 world3;
                uniform mat4 world;
                uniform mat4 viewProjection;

                in vec4 instanceColor;

                out vec3 vNormal;
                out vec4 vColor;

                void main() {
                    mat4 finalWorld = world * mat4(world0, world1, world2, world3);
                    vec4 worldPos = finalWorld * vec4(position, 1.0);

                    mat3 m3 = mat3(finalWorld);
                    vec3 scaling = vec3(dot(m3[0], m3[0]), dot(m3[1], m3[1]), dot(m3[2], m3[2]));
                    vNormal = normalize(m3 * (normal / scaling));

                    gl_Position = viewProjection * worldPos;

                    vColor = instanceColor;
                }
            `,
            fragmentSource: `
                #version 300 es
                precision highp float;

                uniform vec3 cameraDirection;

                uniform float cmapMin;
                uniform float cmapInvLength; // = 1 / (max - min)
                uniform sampler2D cmap;

                in vec3 vNormal;
                in vec4 vColor;

                out vec4 outColor;

                void main() {
                    float u = (vColor.r - cmapMin) * cmapInvLength;
                    vec4 cmapColor = texture(cmap, vec2(u, 0.5));

                    // if alpha is < -0.5, use cmap
                    float flag = (sign(vColor.a + 0.5) + 1.0) * 0.5;
                    vec4 color = mix(cmapColor, vColor, flag);

                    //simple lighting
                    float diff = max(-dot(vNormal, cameraDirection), 0.0);
                    outColor = vec4(diff * color.rgb, color.a);
                }
            `
        },
        {
            attributes: ["position", "normal", "world0", "world1", "world2", "world3", "instanceColor"],
            uniforms: ["world", "viewProjection", "cameraDirection", "cmapMin", "cmapInvLength"],
            samplers: ["cmap"],
            needAlphaBlending: true,
            needAlphaTesting: true
        }
    );
    material.needDepthPrePass = true;

    //hook up cmap
    material.setTexture("cmap", cmap.texture);
    material.setFloat("cmapMin", cmap.minScalar);
    material.setFloat("cmapInvLength", 1.0 / (cmap.maxScalar - cmap.minScalar));
    cmap.onMinScalarChanged.add(() => {
        material.setFloat("cmapMin", cmap.minScalar);
        material.setFloat("cmapInvLength", 1.0 / (cmap.maxScalar - cmap.minScalar));
    });
    cmap.onMaxScalarChanged.add(() => {
        material.setFloat("cmapInvLength", 1.0 / (cmap.maxScalar - cmap.minScalar));
    });

    //hook up camera
    const camDir = Vector3.Zero();
    scene.onBeforeCameraRenderObservable.add((cam) => {
        Axis.Z.applyRotationQuaternionToRef(cam.absoluteRotation, camDir);
        camDir.normalize();
        material.setVector3("cameraDirection", camDir);
    });

    //done
    return material;
}
