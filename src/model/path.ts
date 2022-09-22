/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Interpolation, interpolationFromJSON, interpolationToJSON } from "./interpolation";
import { Vector } from "./vector";

export const protobufPackage = "p1on";

/** Path mapping time to a vector in 3D space */
export interface Path {
  /** Name as shown in explorer */
  name: string;
  /** Unique id used to reference this path */
  id: number;
  /** interpolation points */
  points: Path_Point[];
  /** interpolation mode */
  interpolation: Interpolation;
}

/** Interpolation point */
export interface Path_Point {
  /** Time coordinate */
  time: number;
  /** Position of control point */
  position: Vector | undefined;
}

function createBasePath(): Path {
  return { name: "", id: 0, points: [], interpolation: 0 };
}

export const Path = {
  encode(message: Path, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint32(message.id);
    }
    for (const v of message.points) {
      Path_Point.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.interpolation !== 0) {
      writer.uint32(32).int32(message.interpolation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Path {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePath();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.id = reader.uint32();
          break;
        case 3:
          message.points.push(Path_Point.decode(reader, reader.uint32()));
          break;
        case 4:
          message.interpolation = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Path {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      points: Array.isArray(object?.points) ? object.points.map((e: any) => Path_Point.fromJSON(e)) : [],
      interpolation: isSet(object.interpolation) ? interpolationFromJSON(object.interpolation) : 0,
    };
  },

  toJSON(message: Path): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.id !== undefined && (obj.id = Math.round(message.id));
    if (message.points) {
      obj.points = message.points.map((e) => e ? Path_Point.toJSON(e) : undefined);
    } else {
      obj.points = [];
    }
    message.interpolation !== undefined && (obj.interpolation = interpolationToJSON(message.interpolation));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Path>, I>>(object: I): Path {
    const message = createBasePath();
    message.name = object.name ?? "";
    message.id = object.id ?? 0;
    message.points = object.points?.map((e) => Path_Point.fromPartial(e)) || [];
    message.interpolation = object.interpolation ?? 0;
    return message;
  },
};

function createBasePath_Point(): Path_Point {
  return { time: 0, position: undefined };
}

export const Path_Point = {
  encode(message: Path_Point, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.time !== 0) {
      writer.uint32(9).double(message.time);
    }
    if (message.position !== undefined) {
      Vector.encode(message.position, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Path_Point {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePath_Point();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.time = reader.double();
          break;
        case 2:
          message.position = Vector.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Path_Point {
    return {
      time: isSet(object.time) ? Number(object.time) : 0,
      position: isSet(object.position) ? Vector.fromJSON(object.position) : undefined,
    };
  },

  toJSON(message: Path_Point): unknown {
    const obj: any = {};
    message.time !== undefined && (obj.time = message.time);
    message.position !== undefined && (obj.position = message.position ? Vector.toJSON(message.position) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Path_Point>, I>>(object: I): Path_Point {
    const message = createBasePath_Point();
    message.time = object.time ?? 0;
    message.position = (object.position !== undefined && object.position !== null)
      ? Vector.fromPartial(object.position)
      : undefined;
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
