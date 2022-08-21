/* eslint-disable */
import { ColorProperty, VectorProperty, ScalarProperty } from "./properties";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "p1on";

/** Animated line in 3D space */
export interface Line {
  /** Name as shown in explorer */
  name: string;
  /** Name of group this belongs to */
  group: string;
  /** Additional text shown when selected */
  description: string;
  /** Color */
  color: ColorProperty | undefined;
  /** start position */
  start: VectorProperty | undefined;
  /** end position */
  end: VectorProperty | undefined;
  /** Line diameter */
  lineWidth: ScalarProperty | undefined;
  /** true, if there should be a cone pointing toward the start point */
  pointForward: boolean;
  /** true, if there should be a cone pointing toward the end point */
  pointBackward: boolean;
}

function createBaseLine(): Line {
  return {
    name: "",
    group: "",
    description: "",
    color: undefined,
    start: undefined,
    end: undefined,
    lineWidth: undefined,
    pointForward: false,
    pointBackward: false,
  };
}

export const Line = {
  encode(message: Line, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.group !== "") {
      writer.uint32(18).string(message.group);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.color !== undefined) {
      ColorProperty.encode(message.color, writer.uint32(34).fork()).ldelim();
    }
    if (message.start !== undefined) {
      VectorProperty.encode(message.start, writer.uint32(82).fork()).ldelim();
    }
    if (message.end !== undefined) {
      VectorProperty.encode(message.end, writer.uint32(90).fork()).ldelim();
    }
    if (message.lineWidth !== undefined) {
      ScalarProperty.encode(
        message.lineWidth,
        writer.uint32(98).fork()
      ).ldelim();
    }
    if (message.pointForward === true) {
      writer.uint32(104).bool(message.pointForward);
    }
    if (message.pointBackward === true) {
      writer.uint32(112).bool(message.pointBackward);
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
          message.group = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.color = ColorProperty.decode(reader, reader.uint32());
          break;
        case 10:
          message.start = VectorProperty.decode(reader, reader.uint32());
          break;
        case 11:
          message.end = VectorProperty.decode(reader, reader.uint32());
          break;
        case 12:
          message.lineWidth = ScalarProperty.decode(reader, reader.uint32());
          break;
        case 13:
          message.pointForward = reader.bool();
          break;
        case 14:
          message.pointBackward = reader.bool();
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
      group: isSet(object.group) ? String(object.group) : "",
      description: isSet(object.description) ? String(object.description) : "",
      color: isSet(object.color)
        ? ColorProperty.fromJSON(object.color)
        : undefined,
      start: isSet(object.start)
        ? VectorProperty.fromJSON(object.start)
        : undefined,
      end: isSet(object.end) ? VectorProperty.fromJSON(object.end) : undefined,
      lineWidth: isSet(object.lineWidth)
        ? ScalarProperty.fromJSON(object.lineWidth)
        : undefined,
      pointForward: isSet(object.pointForward)
        ? Boolean(object.pointForward)
        : false,
      pointBackward: isSet(object.pointBackward)
        ? Boolean(object.pointBackward)
        : false,
    };
  },

  toJSON(message: Line): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.group !== undefined && (obj.group = message.group);
    message.description !== undefined &&
      (obj.description = message.description);
    message.color !== undefined &&
      (obj.color = message.color
        ? ColorProperty.toJSON(message.color)
        : undefined);
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
    message.pointForward !== undefined &&
      (obj.pointForward = message.pointForward);
    message.pointBackward !== undefined &&
      (obj.pointBackward = message.pointBackward);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Line>, I>>(object: I): Line {
    const message = createBaseLine();
    message.name = object.name ?? "";
    message.group = object.group ?? "";
    message.description = object.description ?? "";
    message.color =
      object.color !== undefined && object.color !== null
        ? ColorProperty.fromPartial(object.color)
        : undefined;
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
    message.pointForward = object.pointForward ?? false;
    message.pointBackward = object.pointBackward ?? false;
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
