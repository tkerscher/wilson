/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Color } from "./color";

export const protobufPackage = "p1on";

/** Color map converting scalars into colors */
export interface ColorMap {
  /** gradient stops */
  stops: ColorMap_Stop[];
}

/** Color stops */
export interface ColorMap_Stop {
  /** value at which to stop */
  value: number;
  /** Color at this stop */
  color: Color | undefined;
}

function createBaseColorMap(): ColorMap {
  return { stops: [] };
}

export const ColorMap = {
  encode(
    message: ColorMap,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.stops) {
      ColorMap_Stop.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ColorMap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseColorMap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stops.push(ColorMap_Stop.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ColorMap {
    return {
      stops: Array.isArray(object?.stops)
        ? object.stops.map((e: any) => ColorMap_Stop.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ColorMap): unknown {
    const obj: any = {};
    if (message.stops) {
      obj.stops = message.stops.map((e) =>
        e ? ColorMap_Stop.toJSON(e) : undefined
      );
    } else {
      obj.stops = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ColorMap>, I>>(object: I): ColorMap {
    const message = createBaseColorMap();
    message.stops =
      object.stops?.map((e) => ColorMap_Stop.fromPartial(e)) || [];
    return message;
  },
};

function createBaseColorMap_Stop(): ColorMap_Stop {
  return { value: 0, color: undefined };
}

export const ColorMap_Stop = {
  encode(
    message: ColorMap_Stop,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.value !== 0) {
      writer.uint32(9).double(message.value);
    }
    if (message.color !== undefined) {
      Color.encode(message.color, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ColorMap_Stop {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseColorMap_Stop();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.double();
          break;
        case 2:
          message.color = Color.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ColorMap_Stop {
    return {
      value: isSet(object.value) ? Number(object.value) : 0,
      color: isSet(object.color) ? Color.fromJSON(object.color) : undefined,
    };
  },

  toJSON(message: ColorMap_Stop): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = message.value);
    message.color !== undefined &&
      (obj.color = message.color ? Color.toJSON(message.color) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ColorMap_Stop>, I>>(
    object: I
  ): ColorMap_Stop {
    const message = createBaseColorMap_Stop();
    message.value = object.value ?? 0;
    message.color =
      object.color !== undefined && object.color !== null
        ? Color.fromPartial(object.color)
        : undefined;
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
