/* eslint-disable */
import { ProjectMeta } from "./meta";
import { Graph } from "./graph";
import { Path } from "./path";
import { ColorMap } from "./colormap";
import { Camera } from "./camera";
import { Sphere } from "./sphere";
import { Line } from "./line";
import { Tube } from "./tube";
import { Label } from "./label";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "p1on";

/** Root container for all animation relevant data */
export interface Project {
  /** Meta information */
  meta: ProjectMeta | undefined;
  /** list of graphs */
  graphs: Graph[];
  /** list of paths */
  paths: Path[];
  /**
   * list of scripts
   * repeated Script scripts = 4;
   * global color map
   */
  colormap: ColorMap | undefined;
  /** Overrides standard camera if provided */
  camera: Camera | undefined;
  /** list of animated spheres */
  spheres: Sphere[];
  /** list of animated lines */
  lines: Line[];
  /** list of animated tubes */
  tubes: Tube[];
  /** list of animated labels */
  labels: Label[];
}

function createBaseProject(): Project {
  return {
    meta: undefined,
    graphs: [],
    paths: [],
    colormap: undefined,
    camera: undefined,
    spheres: [],
    lines: [],
    tubes: [],
    labels: [],
  };
}

export const Project = {
  encode(
    message: Project,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    for (const v of message.spheres) {
      Sphere.encode(v!, writer.uint32(130).fork()).ldelim();
    }
    for (const v of message.lines) {
      Line.encode(v!, writer.uint32(138).fork()).ldelim();
    }
    for (const v of message.tubes) {
      Tube.encode(v!, writer.uint32(146).fork()).ldelim();
    }
    for (const v of message.labels) {
      Label.encode(v!, writer.uint32(154).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Project {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.meta = ProjectMeta.decode(reader, reader.uint32());
          break;
        case 2:
          message.graphs.push(Graph.decode(reader, reader.uint32()));
          break;
        case 3:
          message.paths.push(Path.decode(reader, reader.uint32()));
          break;
        case 5:
          message.colormap = ColorMap.decode(reader, reader.uint32());
          break;
        case 10:
          message.camera = Camera.decode(reader, reader.uint32());
          break;
        case 16:
          message.spheres.push(Sphere.decode(reader, reader.uint32()));
          break;
        case 17:
          message.lines.push(Line.decode(reader, reader.uint32()));
          break;
        case 18:
          message.tubes.push(Tube.decode(reader, reader.uint32()));
          break;
        case 19:
          message.labels.push(Label.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Project {
    return {
      meta: isSet(object.meta) ? ProjectMeta.fromJSON(object.meta) : undefined,
      graphs: Array.isArray(object?.graphs)
        ? object.graphs.map((e: any) => Graph.fromJSON(e))
        : [],
      paths: Array.isArray(object?.paths)
        ? object.paths.map((e: any) => Path.fromJSON(e))
        : [],
      colormap: isSet(object.colormap)
        ? ColorMap.fromJSON(object.colormap)
        : undefined,
      camera: isSet(object.camera) ? Camera.fromJSON(object.camera) : undefined,
      spheres: Array.isArray(object?.spheres)
        ? object.spheres.map((e: any) => Sphere.fromJSON(e))
        : [],
      lines: Array.isArray(object?.lines)
        ? object.lines.map((e: any) => Line.fromJSON(e))
        : [],
      tubes: Array.isArray(object?.tubes)
        ? object.tubes.map((e: any) => Tube.fromJSON(e))
        : [],
      labels: Array.isArray(object?.labels)
        ? object.labels.map((e: any) => Label.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Project): unknown {
    const obj: any = {};
    message.meta !== undefined &&
      (obj.meta = message.meta ? ProjectMeta.toJSON(message.meta) : undefined);
    if (message.graphs) {
      obj.graphs = message.graphs.map((e) => (e ? Graph.toJSON(e) : undefined));
    } else {
      obj.graphs = [];
    }
    if (message.paths) {
      obj.paths = message.paths.map((e) => (e ? Path.toJSON(e) : undefined));
    } else {
      obj.paths = [];
    }
    message.colormap !== undefined &&
      (obj.colormap = message.colormap
        ? ColorMap.toJSON(message.colormap)
        : undefined);
    message.camera !== undefined &&
      (obj.camera = message.camera ? Camera.toJSON(message.camera) : undefined);
    if (message.spheres) {
      obj.spheres = message.spheres.map((e) =>
        e ? Sphere.toJSON(e) : undefined
      );
    } else {
      obj.spheres = [];
    }
    if (message.lines) {
      obj.lines = message.lines.map((e) => (e ? Line.toJSON(e) : undefined));
    } else {
      obj.lines = [];
    }
    if (message.tubes) {
      obj.tubes = message.tubes.map((e) => (e ? Tube.toJSON(e) : undefined));
    } else {
      obj.tubes = [];
    }
    if (message.labels) {
      obj.labels = message.labels.map((e) => (e ? Label.toJSON(e) : undefined));
    } else {
      obj.labels = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Project>, I>>(object: I): Project {
    const message = createBaseProject();
    message.meta =
      object.meta !== undefined && object.meta !== null
        ? ProjectMeta.fromPartial(object.meta)
        : undefined;
    message.graphs = object.graphs?.map((e) => Graph.fromPartial(e)) || [];
    message.paths = object.paths?.map((e) => Path.fromPartial(e)) || [];
    message.colormap =
      object.colormap !== undefined && object.colormap !== null
        ? ColorMap.fromPartial(object.colormap)
        : undefined;
    message.camera =
      object.camera !== undefined && object.camera !== null
        ? Camera.fromPartial(object.camera)
        : undefined;
    message.spheres = object.spheres?.map((e) => Sphere.fromPartial(e)) || [];
    message.lines = object.lines?.map((e) => Line.fromPartial(e)) || [];
    message.tubes = object.tubes?.map((e) => Tube.fromPartial(e)) || [];
    message.labels = object.labels?.map((e) => Label.fromPartial(e)) || [];
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string }
  ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & {
      $case: T["$case"];
    }
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
