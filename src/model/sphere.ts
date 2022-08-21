/* eslint-disable */
import { ColorProperty, VectorProperty, ScalarProperty } from "./properties";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "p1on";

/** Animatible sphere in 3D space */
export interface Sphere {
  /** Name as shown in explorer */
  name: string;
  /** Name of group this belongs to */
  group: string;
  /** Additional text shown when selected */
  description: string;
  /** Color */
  color: ColorProperty | undefined;
  /** center of sphere */
  position: VectorProperty | undefined;
  /** Radius */
  radius: ScalarProperty | undefined;
}

function createBaseSphere(): Sphere {
  return {
    name: "",
    group: "",
    description: "",
    color: undefined,
    position: undefined,
    radius: undefined,
  };
}

export const Sphere = {
  encode(
    message: Sphere,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    if (message.position !== undefined) {
      VectorProperty.encode(
        message.position,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.radius !== undefined) {
      ScalarProperty.encode(message.radius, writer.uint32(90).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Sphere {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSphere();
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
          message.position = VectorProperty.decode(reader, reader.uint32());
          break;
        case 11:
          message.radius = ScalarProperty.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Sphere {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      group: isSet(object.group) ? String(object.group) : "",
      description: isSet(object.description) ? String(object.description) : "",
      color: isSet(object.color)
        ? ColorProperty.fromJSON(object.color)
        : undefined,
      position: isSet(object.position)
        ? VectorProperty.fromJSON(object.position)
        : undefined,
      radius: isSet(object.radius)
        ? ScalarProperty.fromJSON(object.radius)
        : undefined,
    };
  },

  toJSON(message: Sphere): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.group !== undefined && (obj.group = message.group);
    message.description !== undefined &&
      (obj.description = message.description);
    message.color !== undefined &&
      (obj.color = message.color
        ? ColorProperty.toJSON(message.color)
        : undefined);
    message.position !== undefined &&
      (obj.position = message.position
        ? VectorProperty.toJSON(message.position)
        : undefined);
    message.radius !== undefined &&
      (obj.radius = message.radius
        ? ScalarProperty.toJSON(message.radius)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Sphere>, I>>(object: I): Sphere {
    const message = createBaseSphere();
    message.name = object.name ?? "";
    message.group = object.group ?? "";
    message.description = object.description ?? "";
    message.color =
      object.color !== undefined && object.color !== null
        ? ColorProperty.fromPartial(object.color)
        : undefined;
    message.position =
      object.position !== undefined && object.position !== null
        ? VectorProperty.fromPartial(object.position)
        : undefined;
    message.radius =
      object.radius !== undefined && object.radius !== null
        ? ScalarProperty.fromPartial(object.radius)
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
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
