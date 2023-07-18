/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Animatible } from "./animatible";
import { Camera } from "./camera";
import { ColorMap } from "./colormap";
import { Graph } from "./graph";
import { ProjectMeta } from "./meta";
import { Path } from "./path";

export const protobufPackage = "wilson";

/** Root container for all animation relevant data */
export interface Project {
  /** Meta information */
  meta:
    | ProjectMeta
    | undefined;
  /** list of graphs */
  graphs: Graph[];
  /** list of paths */
  paths: Path[];
  /** global color map */
  colormap:
    | ColorMap
    | undefined;
  /** Overrides standard camera if provided */
  camera:
    | Camera
    | undefined;
  /** list of groups hidden by default */
  hiddenGroups: string[];
  /** list of animatibles */
  animatibles: Animatible[];
}

function createBaseProject(): Project {
  return {
    meta: undefined,
    graphs: [],
    paths: [],
    colormap: undefined,
    camera: undefined,
    hiddenGroups: [],
    animatibles: [],
  };
}

export const Project = {
  encode(message: Project, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.meta !== undefined) {
      ProjectMeta.encode(message.meta, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.graphs) {
      Graph.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.paths) {
      Path.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.colormap !== undefined) {
      ColorMap.encode(message.colormap, writer.uint32(42).fork()).ldelim();
    }
    if (message.camera !== undefined) {
      Camera.encode(message.camera, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.hiddenGroups) {
      writer.uint32(122).string(v!);
    }
    for (const v of message.animatibles) {
      Animatible.encode(v!, writer.uint32(130).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Project {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.meta = ProjectMeta.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.graphs.push(Graph.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.paths.push(Path.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.colormap = ColorMap.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.camera = Camera.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.hiddenGroups.push(reader.string());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.animatibles.push(Animatible.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Project {
    return {
      meta: isSet(object.meta) ? ProjectMeta.fromJSON(object.meta) : undefined,
      graphs: Array.isArray(object?.graphs) ? object.graphs.map((e: any) => Graph.fromJSON(e)) : [],
      paths: Array.isArray(object?.paths) ? object.paths.map((e: any) => Path.fromJSON(e)) : [],
      colormap: isSet(object.colormap) ? ColorMap.fromJSON(object.colormap) : undefined,
      camera: isSet(object.camera) ? Camera.fromJSON(object.camera) : undefined,
      hiddenGroups: Array.isArray(object?.hiddenGroups) ? object.hiddenGroups.map((e: any) => String(e)) : [],
      animatibles: Array.isArray(object?.animatibles) ? object.animatibles.map((e: any) => Animatible.fromJSON(e)) : [],
    };
  },

  toJSON(message: Project): unknown {
    const obj: any = {};
    if (message.meta !== undefined) {
      obj.meta = ProjectMeta.toJSON(message.meta);
    }
    if (message.graphs?.length) {
      obj.graphs = message.graphs.map((e) => Graph.toJSON(e));
    }
    if (message.paths?.length) {
      obj.paths = message.paths.map((e) => Path.toJSON(e));
    }
    if (message.colormap !== undefined) {
      obj.colormap = ColorMap.toJSON(message.colormap);
    }
    if (message.camera !== undefined) {
      obj.camera = Camera.toJSON(message.camera);
    }
    if (message.hiddenGroups?.length) {
      obj.hiddenGroups = message.hiddenGroups;
    }
    if (message.animatibles?.length) {
      obj.animatibles = message.animatibles.map((e) => Animatible.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Project>, I>>(base?: I): Project {
    return Project.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Project>, I>>(object: I): Project {
    const message = createBaseProject();
    message.meta = (object.meta !== undefined && object.meta !== null)
      ? ProjectMeta.fromPartial(object.meta)
      : undefined;
    message.graphs = object.graphs?.map((e) => Graph.fromPartial(e)) || [];
    message.paths = object.paths?.map((e) => Path.fromPartial(e)) || [];
    message.colormap = (object.colormap !== undefined && object.colormap !== null)
      ? ColorMap.fromPartial(object.colormap)
      : undefined;
    message.camera = (object.camera !== undefined && object.camera !== null)
      ? Camera.fromPartial(object.camera)
      : undefined;
    message.hiddenGroups = object.hiddenGroups?.map((e) => e) || [];
    message.animatibles = object.animatibles?.map((e) => Animatible.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
