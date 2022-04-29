/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { VectorProperty, ScalarProperty, ColorProperty } from "./properties";

export const protobufPackage = "p1on";

/** Animated line in 3D space */
export interface Line {
  /** Name as shown in explorer */
  name: string;
  /** Additional text shown when selected */
  description: string;
  /** True, if visible in 3D viewer */
  isVisible: boolean;
  /** start position */
  start: VectorProperty | undefined;
  /** end position */
  end: VectorProperty | undefined;
  /** Line diameter */
  lineWidth: ScalarProperty | undefined;
  /** Diameter of arrow head or cone. Zero if a simple line should be drawn. */
  headSize: ScalarProperty | undefined;
  /** Color */
  color: ColorProperty | undefined;
}

function createBaseLine(): Line {
  return {
    name: "",
    description: "",
    isVisible: false,
    start: undefined,
    end: undefined,
    lineWidth: undefined,
    headSize: undefined,
    color: undefined,
  };
}

export const Line = {
  encode(message: Line, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.isVisible === true) {
      writer.uint32(24).bool(message.isVisible);
    }
    if (message.start !== undefined) {
      VectorProperty.encode(message.start, writer.uint32(34).fork()).ldelim();
    }
    if (message.end !== undefined) {
      VectorProperty.encode(message.end, writer.uint32(42).fork()).ldelim();
    }
    if (message.lineWidth !== undefined) {
      ScalarProperty.encode(
        message.lineWidth,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.headSize !== undefined) {
      ScalarProperty.encode(
        message.headSize,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.color !== undefined) {
      ColorProperty.encode(message.color, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Line {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLine();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.isVisible = reader.bool();
          break;
        case 4:
          message.start = VectorProperty.decode(reader, reader.uint32());
          break;
        case 5:
          message.end = VectorProperty.decode(reader, reader.uint32());
          break;
        case 6:
          message.lineWidth = ScalarProperty.decode(reader, reader.uint32());
          break;
        case 7:
          message.headSize = ScalarProperty.decode(reader, reader.uint32());
          break;
        case 8:
          message.color = ColorProperty.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Line {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      isVisible: isSet(object.isVisible) ? Boolean(object.isVisible) : false,
      start: isSet(object.start)
        ? VectorProperty.fromJSON(object.start)
        : undefined,
      end: isSet(object.end) ? VectorProperty.fromJSON(object.end) : undefined,
      lineWidth: isSet(object.lineWidth)
        ? ScalarProperty.fromJSON(object.lineWidth)
        : undefined,
      headSize: isSet(object.headSize)
        ? ScalarProperty.fromJSON(object.headSize)
        : undefined,
      color: isSet(object.color)
        ? ColorProperty.fromJSON(object.color)
        : undefined,
    };
  },

  toJSON(message: Line): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.isVisible !== undefined && (obj.isVisible = message.isVisible);
    message.start !== undefined &&
      (obj.start = message.start
        ? VectorProperty.toJSON(message.start)
        : undefined);
    message.end !== undefined &&
      (obj.end = message.end ? VectorProperty.toJSON(message.end) : undefined);
    message.lineWidth !== undefined &&
      (obj.lineWidth = message.lineWidth
        ? ScalarProperty.toJSON(message.lineWidth)
        : undefined);
    message.headSize !== undefined &&
      (obj.headSize = message.headSize
        ? ScalarProperty.toJSON(message.headSize)
        : undefined);
    message.color !== undefined &&
      (obj.color = message.color
        ? ColorProperty.toJSON(message.color)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Line>, I>>(object: I): Line {
    const message = createBaseLine();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.isVisible = object.isVisible ?? false;
    message.start =
      object.start !== undefined && object.start !== null
        ? VectorProperty.fromPartial(object.start)
        : undefined;
    message.end =
      object.end !== undefined && object.end !== null
        ? VectorProperty.fromPartial(object.end)
        : undefined;
    message.lineWidth =
      object.lineWidth !== undefined && object.lineWidth !== null
        ? ScalarProperty.fromPartial(object.lineWidth)
        : undefined;
    message.headSize =
      object.headSize !== undefined && object.headSize !== null
        ? ScalarProperty.fromPartial(object.headSize)
        : undefined;
    message.color =
      object.color !== undefined && object.color !== null
        ? ColorProperty.fromPartial(object.color)
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
