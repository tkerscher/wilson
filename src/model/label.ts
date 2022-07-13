/* eslint-disable */
import { ColorProperty, VectorProperty, ScalarProperty } from "./properties";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "p1on";

/** Text in 3D space always facing the camera */
export interface Label {
  /** Name as shown in explorer */
  name: string;
  /** Text to be shown in 3D */
  description: string;
  /** True, if visible in 3D viewer */
  isVisible: boolean;
  /** Text color */
  color: ColorProperty | undefined;
  /** Position of upper left corner */
  position: VectorProperty | undefined;
  /** Font size */
  fontSize: ScalarProperty | undefined;
  /** Background color */
  background: ColorProperty | undefined;
}

function createBaseLabel(): Label {
  return {
    name: "",
    description: "",
    isVisible: false,
    color: undefined,
    position: undefined,
    fontSize: undefined,
    background: undefined,
  };
}

export const Label = {
  encode(message: Label, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.isVisible === true) {
      writer.uint32(24).bool(message.isVisible);
    }
    if (message.color !== undefined) {
      ColorProperty.encode(message.color, writer.uint32(34).fork()).ldelim();
    }
    if (message.position !== undefined) {
      VectorProperty.encode(
        message.position,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.fontSize !== undefined) {
      ScalarProperty.encode(
        message.fontSize,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.background !== undefined) {
      ColorProperty.encode(
        message.background,
        writer.uint32(58).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Label {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLabel();
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
          message.color = ColorProperty.decode(reader, reader.uint32());
          break;
        case 5:
          message.position = VectorProperty.decode(reader, reader.uint32());
          break;
        case 6:
          message.fontSize = ScalarProperty.decode(reader, reader.uint32());
          break;
        case 7:
          message.background = ColorProperty.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Label {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      isVisible: isSet(object.isVisible) ? Boolean(object.isVisible) : false,
      color: isSet(object.color)
        ? ColorProperty.fromJSON(object.color)
        : undefined,
      position: isSet(object.position)
        ? VectorProperty.fromJSON(object.position)
        : undefined,
      fontSize: isSet(object.fontSize)
        ? ScalarProperty.fromJSON(object.fontSize)
        : undefined,
      background: isSet(object.background)
        ? ColorProperty.fromJSON(object.background)
        : undefined,
    };
  },

  toJSON(message: Label): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.isVisible !== undefined && (obj.isVisible = message.isVisible);
    message.color !== undefined &&
      (obj.color = message.color
        ? ColorProperty.toJSON(message.color)
        : undefined);
    message.position !== undefined &&
      (obj.position = message.position
        ? VectorProperty.toJSON(message.position)
        : undefined);
    message.fontSize !== undefined &&
      (obj.fontSize = message.fontSize
        ? ScalarProperty.toJSON(message.fontSize)
        : undefined);
    message.background !== undefined &&
      (obj.background = message.background
        ? ColorProperty.toJSON(message.background)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Label>, I>>(object: I): Label {
    const message = createBaseLabel();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.isVisible = object.isVisible ?? false;
    message.color =
      object.color !== undefined && object.color !== null
        ? ColorProperty.fromPartial(object.color)
        : undefined;
    message.position =
      object.position !== undefined && object.position !== null
        ? VectorProperty.fromPartial(object.position)
        : undefined;
    message.fontSize =
      object.fontSize !== undefined && object.fontSize !== null
        ? ScalarProperty.fromPartial(object.fontSize)
        : undefined;
    message.background =
      object.background !== undefined && object.background !== null
        ? ColorProperty.fromPartial(object.background)
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
