import { Color4 } from "@babylonjs/core";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { RawTexture } from "@babylonjs/core/Materials/Textures/rawTexture";
import { Scene } from "@babylonjs/core/scene";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

import { numToColor } from "../../input/gpuPicking";
import { Animatible } from "../../model/animatible";
import { GraphInterpolator } from "../../interpolation/graphInterpolation";
import { PathInterpolator } from "../../interpolation/pathInterpolation";
import { ObjectHandle, SceneBuildTool } from "./tools";
import { createTextureLookupMaterial } from "../materials/textureLookupMaterial";

const TEXTURE_SIZE = 2048;

//Specialize Animatible type for case of tubes
export type TubeAnimatible = Animatible & { instance: { $case: "tube" }}

//Tube growing animation needs to modify the mesh and is thus a bit more
//complicated. The modifying must happen before each render. It's logic
//is encapsulated in the following class

export class TubeController implements ObjectHandle {
    #name: string;
    #description: string;
    #growing: boolean;
    #mesh: Mesh | undefined;
    #startTime: number;
    #endTime: number;
    #scene: Scene;

    //Data

    #pathInt: PathInterpolator;
    #radInt: GraphInterpolator;
    #keys: Array<number>;
    #path: Array<Vector3>;
    #radii: Array<number>;
    #N: number;

    get name(): string {
        return this.#name;
    }
    get description(): string {
        return this.#description;
    }
    get position(): Vector3 {
        return this.#mesh?.position ?? Vector3.ZeroReadOnly;
    }
    get visible(): boolean {
        return this.#mesh?.isEnabled() ?? false;
    }
    set visible(value: boolean) {
        if (this.#mesh)
            this.#mesh.setEnabled(value);
    }

    constructor(tool: SceneBuildTool, animatible: TubeAnimatible, id: number) {
        this.#scene = tool.scene;
        //copy meta
        this.#name = animatible.name;
        this.#description = animatible.description;
        const tube = animatible.instance.tube;
        this.#growing = tube.isGrowing;

        //create interpolators
        this.#pathInt = new PathInterpolator(tube.pathId, tool.project);
        this.#radInt = new GraphInterpolator(tube.radius, tool.project);

        //collect animation key times
        this.#keys = this.#pathInt.path.map(p => p.time)
            .concat(this.#radInt.points.map(p => p.time));
        //remove duplicates
        this.#keys.sort((a, b) => a - b);
        this.#keys = this.#keys.filter((t, idx) =>
            !(idx > 0 && Math.abs(this.#keys[idx - 1] - t) < 1e-7));

        //panic: We need at least two points to create a tube
        if (this.#keys.length < 2) {
            this.#startTime = 0.0;
            this.#endTime = 0.0;
            this.#path = [];
            this.#radii = [];
            this.#N = 0;
            return;
        }

        //set endtime
        this.#N = this.#keys.length;
        this.#startTime = this.#keys[0];
        this.#endTime = this.#keys[this.#N - 1];
        const period = this.#endTime - this.#startTime;

        //fill control points
        this.#path = this.#keys.map(t => this.#pathInt.interpolate(t));
        this.#radii = this.#keys.map(t => this.#radInt.interpolate(t));

        //we need two extra points for interpolation
        this.#path.push(this.#path[this.#N - 1], this.#path[this.#N - 1]);

        //create mesh
        this.#mesh = this.#createMesh(tool.project.meta?.startTime ?? 0.0);

        //Static color?
        if (!tube.color || !tube.color.source || tube.color.source.$case != "graphId") {
            const tmp = { c: new Color4() };
            tool.parseColor(tube.color, tmp, "c"); //TODO: this is ugly
            const mat = new StandardMaterial(animatible.name + "_mat", this.#scene);
            mat.specularPower = 0.0;
            mat.diffuseColor.copyFromFloats(tmp.c.r, tmp.c.g, tmp.c.b);
            this.#mesh.material = mat;
        }
        else {
            //graph as color source -> check if id is valid
            const id = tube.color.source.graphId;
            const graph = tool.project.graphs.find(g => g.id == id);
            if (!graph || graph.points.length == 0) {
                //fall back
                this.#mesh.material = tool.defaultMaterial;
            }
            else {
                const graphInt = new GraphInterpolator(id, tool.project);
                const startTime = this.#startTime;
                const data = new Float32Array(function*() {
                    for (let i = 0; i < TEXTURE_SIZE; ++i) {
                        const t = i / TEXTURE_SIZE * period + startTime;
                        yield graphInt.interpolate(t);
                    }
                }());

                //bake texture
                const texture = RawTexture.CreateRTexture(
                    data, 1, TEXTURE_SIZE,
                    tool.scene,
                    false, false,
                    Texture.BILINEAR_SAMPLINGMODE,
                    Engine.TEXTURETYPE_FLOAT);

                //create and assign material
                this.#mesh.material = createTextureLookupMaterial(
                    animatible.name + "_mat",
                    tool.scene,
                    tool.cmapController,
                    texture);
            }
        }

        //enable picking

        //we need a special material here, since we don't use instancing
        const pickMat = new StandardMaterial(animatible.name + "_pickMat", this.#scene);
        pickMat.disableLighting = true;
        const c = numToColor(id);
        pickMat.emissiveColor.copyFromFloats(c[0], c[1], c[2]);
        //wire up picking
        tool.picking.addPickable({
            mesh: this.#mesh,
            material: pickMat
        });
    }

    update(t: number) {
        //safety guard
        if (this.#keys.length < 2) {
            return;
        }

        //shortcut: static tubes do not need to be updated
        if (!this.#growing && this.#mesh != undefined) {
            return;
        }

        //update mesh
        this.#mesh = this.#createMesh(t);
    }
    #createMesh(t: number): Mesh {
        //Build complete if not growing or t is high enough
        if (!this.#growing || t > this.#endTime) {
            return MeshBuilder.CreateTube(this.#name, {
                path: this.#path.slice(0,-2), //remove interpolation points
                radiusFunction: (i) => this.#radii[i],
                tessellation: 64,
                sideOrientation: Mesh.DOUBLESIDE,
                updatable: true,
                instance: this.#mesh
            }, this.#scene);
        }

        //Edge case: t earlier than first key frame (plus some slack) -> render empty
        if (t - this.#startTime <= 1e-4) {
            return MeshBuilder.CreateTube(this.#name, {
                path: this.#path,
                radius: 0.0,
                sideOrientation: Mesh.DOUBLESIDE,
                updatable: true,
                instance: this.#mesh
            }, this.#scene);
        }

        //get last index before t
        const lastIdx = this.#keys.findIndex(key => key >= t);
        //copy path until before t
        const path = this.#path.slice(0,lastIdx);
        //interpolate until t if necessary
        if (t - this.#keys[lastIdx] < 1e-7) {
            const grad = this.#path[lastIdx].subtract(this.#path[lastIdx - 1]).normalize();
            const p = this.#pathInt.interpolate(t);
            path[lastIdx] = p;
            path[lastIdx + 1] = p.add(grad.scaleInPlace(1e-6));
        }
        //copy rest of path
        path.push(...this.#path.slice(lastIdx,-2));

        const rad = (i: number): number => {
            if (i < lastIdx) {
                return this.#radii[i];
            }
            else if (i == lastIdx) {
                return this.#radInt.interpolate(t);
            }
            else {
                return 0.0;
            }
        };

        //update mesh
        return MeshBuilder.CreateTube(this.#name, {
            path: path,
            radiusFunction: rad,
            sideOrientation: Mesh.DOUBLESIDE,
            updatable: true,
            instance: this.#mesh
        }, this.#scene);
    }
}
