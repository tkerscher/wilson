import { Axis, Vector3 } from "@babylonjs/core/Maths/math";
import { Scene } from "@babylonjs/core/scene";
import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial";

export function createSolidColorInstanceMaterial(scene: Scene): ShaderMaterial {
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

                in vec3 vNormal;
                in vec4 vColor;

                out vec4 outColor;

                void main() {
                    float diff = max(-dot(vNormal, cameraDirection), 0.0);
                    outColor = vec4(diff * vColor.rgb, vColor.a);
                }
            `
        },
        {
            attributes: ["position", "normal", "world0", "world1", "world2", "world3", "instanceColor"],
            uniforms: ["world", "viewProjection", "cameraDirection"]
        }
    );

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
