/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "p1on";

/** 2D function mapping time to a scalar value */
export interface Graph {
  /** Name as shown in explorer */
  name: string;
  /** Unique id used to reference this graph */
  id: number;
  /** interpolation points */
  points: Graph_Point[];
}

/** Interpolation point */
export interface Graph_Point {
  /** Time coordinate */
  time: number;
  /** Value at time */
  value: number;
}

function createBaseGraph(): Graph {
  return { name: "", id: 0, points: [] };
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
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Graph {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGraph();
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
          message.points.push(Graph_Point.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Graph {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      points: Array.isArray(object?.points)
        ? object.points.map((e: any) => Graph_Point.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Graph): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.id !== undefined && (obj.id = Math.round(message.id));
    if (message.points) {
      obj.points = message.points.map((e) =>
        e ? Graph_Point.toJSON(e) : undefined
      );
    } else {
      obj.points = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Graph>, I>>(object: I): Graph {
    const message = createBaseGraph();
    message.name = object.name ?? "";
    message.id = object.id ?? 0;
    message.points =
      object.points?.map((e) => Graph_Point.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGraph_Point(): Graph_Point {
  return { time: 0, value: 0 };
}

export const Graph_Point = {
  encode(
    message: Graph_Point,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.time !== 0) {
      writer.uint32(9).double(message.time);
    }
    if (message.value !== 0) {
      writer.uint32(17).double(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Graph_Point {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGraph_Point();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.time = reader.double();
          break;
        case 2:
          message.value = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
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

  fromPartial<I extends Exact<DeepPartial<Graph_Point>, I>>(
    object: I
  ): Graph_Point {
    const message = createBaseGraph_Point();
    message.time = object.time ?? 0;
    message.value = object.value ?? 0;
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
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
