/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ColorProperty, ScalarProperty, VectorProperty } from "./properties";

export const protobufPackage = "wilson";

/** Animatible sphere in 3D space */
export interface Sphere {
  /** center of sphere */
  position:
    | VectorProperty
    | undefined;
  /** Radius */
  radius:
    | ScalarProperty
    | undefined;
  /** Color */
  color: ColorProperty | undefined;
}

function createBaseSphere(): Sphere {
  return { position: undefined, radius: undefined, color: undefined };
}

export const Sphere = {
  encode(message: Sphere, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.position !== undefined) {
      VectorProperty.encode(message.position, writer.uint32(10).fork()).ldelim();
    }
    if (message.radius !== undefined) {
      ScalarProperty.encode(message.radius, writer.uint32(18).fork()).ldelim();
    }
    if (message.color !== undefined) {
      ColorProperty.encode(message.color, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Sphere {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSphere();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.position = VectorProperty.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.radius = ScalarProperty.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.color = ColorProperty.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Sphere {
    return {
      position: isSet(object.position) ? VectorProperty.fromJSON(object.position) : undefined,
      radius: isSet(object.radius) ? ScalarProperty.fromJSON(object.radius) : undefined,
      color: isSet(object.color) ? ColorProperty.fromJSON(object.color) : undefined,
    };
  },

  toJSON(message: Sphere): unknown {
    const obj: any = {};
    message.position !== undefined &&
      (obj.position = message.position ? VectorProperty.toJSON(message.position) : undefined);
    message.radius !== undefined && (obj.radius = message.radius ? ScalarProperty.toJSON(message.radius) : undefined);
    message.color !== undefined && (obj.color = message.color ? ColorProperty.toJSON(message.color) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Sphere>, I>>(base?: I): Sphere {
    return Sphere.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Sphere>, I>>(object: I): Sphere {
    const message = createBaseSphere();
    message.position = (object.position !== undefined && object.position !== null)
      ? VectorProperty.fromPartial(object.position)
      : undefined;
    message.radius = (object.radius !== undefined && object.radius !== null)
      ? ScalarProperty.fromPartial(object.radius)
      : undefined;
    message.color = (object.color !== undefined && object.color !== null)
      ? ColorProperty.fromPartial(object.color)
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
