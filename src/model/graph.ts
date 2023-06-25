/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Interpolation, interpolationFromJSON, interpolationToJSON } from "./interpolation";

export const protobufPackage = "wilson";

/** 2D function mapping time to a scalar value */
export interface Graph {
  /** Name as shown in explorer */
  name: string;
  /** Unique id used to reference this graph */
  id: number;
  /** interpolation points */
  points: Graph_Point[];
  /** interpolation mode */
  interpolation: Interpolation;
}

/** Interpolation point */
export interface Graph_Point {
  /** Time coordinate */
  time: number;
  /** Value at time */
  value: number;
}

function createBaseGraph(): Graph {
  return { name: "", id: 0, points: [], interpolation: 0 };
}

export const Graph = {
  encode(message: Graph, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint32(message.id);
    }
    for (const v of message.points) {
      Graph_Point.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.interpolation !== 0) {
      writer.uint32(32).int32(message.interpolation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Graph {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGraph();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.id = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.points.push(Graph_Point.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.interpolation = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Graph {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      points: Array.isArray(object?.points) ? object.points.map((e: any) => Graph_Point.fromJSON(e)) : [],
      interpolation: isSet(object.interpolation) ? interpolationFromJSON(object.interpolation) : 0,
    };
  },

  toJSON(message: Graph): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.id !== undefined && (obj.id = Math.round(message.id));
    if (message.points) {
      obj.points = message.points.map((e) => e ? Graph_Point.toJSON(e) : undefined);
    } else {
      obj.points = [];
    }
    message.interpolation !== undefined && (obj.interpolation = interpolationToJSON(message.interpolation));
    return obj;
  },

  create<I extends Exact<DeepPartial<Graph>, I>>(base?: I): Graph {
    return Graph.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Graph>, I>>(object: I): Graph {
    const message = createBaseGraph();
    message.name = object.name ?? "";
    message.id = object.id ?? 0;
    message.points = object.points?.map((e) => Graph_Point.fromPartial(e)) || [];
    message.interpolation = object.interpolation ?? 0;
    return message;
  },
};

function createBaseGraph_Point(): Graph_Point {
  return { time: 0, value: 0 };
}

export const Graph_Point = {
  encode(message: Graph_Point, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.time !== 0) {
      writer.uint32(9).double(message.time);
    }
    if (message.value !== 0) {
      writer.uint32(17).double(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Graph_Point {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGraph_Point();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.time = reader.double();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.value = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Graph_Point {
    return {
      time: isSet(object.time) ? Number(object.time) : 0,
      value: isSet(object.value) ? Number(object.value) : 0,
    };
  },

  toJSON(message: Graph_Point): unknown {
    const obj: any = {};
    message.time !== undefined && (obj.time = message.time);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<Graph_Point>, I>>(base?: I): Graph_Point {
    return Graph_Point.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Graph_Point>, I>>(object: I): Graph_Point {
    const message = createBaseGraph_Point();
    message.time = object.time ?? 0;
    message.value = object.value ?? 0;
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
