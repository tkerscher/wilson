import { Axis } from "@babylonjs/core/Maths/math.axis";
import { Effect } from "@babylonjs/core/Materials/effect";
import { Scene } from "@babylonjs/core/scene";
import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

import { ColorMapController } from "./colormapController";

export function createTextureLookupMaterial(
    name: string,
    scene: Scene,
    cmap: ColorMapController,
    texture: Texture
): ShaderMaterial {
    //store shader code in store to reuse it between materials
    if (!("textureCmapVertexShader" in Effect.ShadersStore)) {
        Effect.ShadersStore["textureCmapVertexShader"] = `
            #version 300 es
            precision highp float;

            in vec3 position;
            in vec3 normal;
            in vec2 uv;

            uniform mat4 world;
            uniform mat4 worldViewProjection;

            out vec3 vNormal;
            out vec2 vUV;

            void main() {
                mat3 m3 = mat3(world);
                vec3 scaling = vec3(dot(m3[0], m3[0]), dot(m3[1], m3[1]), dot(m3[2], m3[2]));
                vNormal = normalize(m3 * (normal / scaling));

                vUV = uv;
                
                gl_Position = worldViewProjection * vec4(position, 1.0);
            }
        `;
    }
    if (!("textureCmapFragmentShader" in Effect.ShadersStore)) {
        Effect.ShadersStore["textureCmapFragmentShader"] = `
            #version 300 es
            precision highp float;

            uniform vec3 cameraDirection;

            uniform float cmapMin;
            uniform float cmapInvLength; // = 1 / (max - min)
            uniform sampler2D cmap;

            uniform sampler2D colorTexture;

            in vec3 vNormal;
            in vec2 vUV;

            out vec4 outColor;

            void main() {
                float u = texture(colorTexture, vUV).r;
                u = (u - cmapMin) * cmapInvLength;
                vec4 color = texture(cmap, vec2(u, 0.5));

                //simple lighting
                float diff = max(-dot(vNormal, cameraDirection), 0.0);
                outColor = vec4(diff * color.rgb, color.a);
            }
        `;
    }

    //Create new material
    const material = new ShaderMaterial(name, scene, "textureCmap", {
        attributes: ["position", "normal", "uv"],
        uniforms: ["world", "worldViewProjection", "cameraDirection", "cmapMin", "cmapInvLength"],
        samplers: ["cmap", "colorTexture"],
        needAlphaBlending: true,
        needAlphaTesting: true
    });

    //set texture
    material.setTexture("colorTexture", texture);

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
