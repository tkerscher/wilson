/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ColorProperty, ScalarProperty, VectorProperty } from "./properties";

export const protobufPackage = "wilson";

/**
 * Animatible prism in 3D space
 * A prism is an extruded regular polygon
 */
export interface Prism {
  /** Position at bottom polygon's center */
  position:
    | VectorProperty
    | undefined;
  /** vector from bottom center to top center; length is ignored */
  normal:
    | VectorProperty
    | undefined;
  /** rotation angle in radians around normal */
  rotation:
    | ScalarProperty
    | undefined;
  /** Radius of circle the polygons vertices lie on */
  radius:
    | ScalarProperty
    | undefined;
  /** Distance between bottom and top polygon */
  height:
    | ScalarProperty
    | undefined;
  /** number of vertices in polygon */
  nVertices: number;
  /** Color */
  color: ColorProperty | undefined;
}

function createBasePrism(): Prism {
  return {
    position: undefined,
    normal: undefined,
    rotation: undefined,
    radius: undefined,
    height: undefined,
    nVertices: 0,
    color: undefined,
  };
}

export const Prism = {
  encode(message: Prism, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.position !== undefined) {
      VectorProperty.encode(message.position, writer.uint32(10).fork()).ldelim();
    }
    if (message.normal !== undefined) {
      VectorProperty.encode(message.normal, writer.uint32(18).fork()).ldelim();
    }
    if (message.rotation !== undefined) {
      ScalarProperty.encode(message.rotation, writer.uint32(26).fork()).ldelim();
    }
    if (message.radius !== undefined) {
      ScalarProperty.encode(message.radius, writer.uint32(34).fork()).ldelim();
    }
    if (message.height !== undefined) {
      ScalarProperty.encode(message.height, writer.uint32(42).fork()).ldelim();
    }
    if (message.nVertices !== 0) {
      writer.uint32(48).uint32(message.nVertices);
    }
    if (message.color !== undefined) {
      ColorProperty.encode(message.color, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Prism {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrism();
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

          message.normal = VectorProperty.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.rotation = ScalarProperty.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.radius = ScalarProperty.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.height = ScalarProperty.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.nVertices = reader.uint32();
          continue;
        case 7:
          if (tag !== 58) {
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

  fromJSON(object: any): Prism {
    return {
      position: isSet(object.position) ? VectorProperty.fromJSON(object.position) : undefined,
      normal: isSet(object.normal) ? VectorProperty.fromJSON(object.normal) : undefined,
      rotation: isSet(object.rotation) ? ScalarProperty.fromJSON(object.rotation) : undefined,
      radius: isSet(object.radius) ? ScalarProperty.fromJSON(object.radius) : undefined,
      height: isSet(object.height) ? ScalarProperty.fromJSON(object.height) : undefined,
      nVertices: isSet(object.nVertices) ? Number(object.nVertices) : 0,
      color: isSet(object.color) ? ColorProperty.fromJSON(object.color) : undefined,
    };
  },

  toJSON(message: Prism): unknown {
    const obj: any = {};
    message.position !== undefined &&
      (obj.position = message.position ? VectorProperty.toJSON(message.position) : undefined);
    message.normal !== undefined && (obj.normal = message.normal ? VectorProperty.toJSON(message.normal) : undefined);
    message.rotation !== undefined &&
      (obj.rotation = message.rotation ? ScalarProperty.toJSON(message.rotation) : undefined);
    message.radius !== undefined && (obj.radius = message.radius ? ScalarProperty.toJSON(message.radius) : undefined);
    message.height !== undefined && (obj.height = message.height ? ScalarProperty.toJSON(message.height) : undefined);
    message.nVertices !== undefined && (obj.nVertices = Math.round(message.nVertices));
    message.color !== undefined && (obj.color = message.color ? ColorProperty.toJSON(message.color) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Prism>, I>>(base?: I): Prism {
    return Prism.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Prism>, I>>(object: I): Prism {
    const message = createBasePrism();
    message.position = (object.position !== undefined && object.position !== null)
      ? VectorProperty.fromPartial(object.position)
      : undefined;
    message.normal = (object.normal !== undefined && object.normal !== null)
      ? VectorProperty.fromPartial(object.normal)
      : undefined;
    message.rotation = (object.rotation !== undefined && object.rotation !== null)
      ? ScalarProperty.fromPartial(object.rotation)
      : undefined;
    message.radius = (object.radius !== undefined && object.radius !== null)
      ? ScalarProperty.fromPartial(object.radius)
      : undefined;
    message.height = (object.height !== undefined && object.height !== null)
      ? ScalarProperty.fromPartial(object.height)
      : undefined;
    message.nVertices = object.nVertices ?? 0;
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
