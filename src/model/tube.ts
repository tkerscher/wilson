/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ColorProperty, ScalarProperty } from "./properties";

export const protobufPackage = "wilson";

/** Tube in 3D space */
export interface Tube {
  /** Index of path to follow */
  pathId: number;
  /**
   * True if the tube is growing with time,
   * or false, if the tube is always drawn complete
   */
  isGrowing: boolean;
  /** Radius of the tube at a certain point identified by time */
  radius:
    | ScalarProperty
    | undefined;
  /** Color of the tube at a certain point identified by time */
  color: ColorProperty | undefined;
}

function createBaseTube(): Tube {
  return { pathId: 0, isGrowing: false, radius: undefined, color: undefined };
}

export const Tube = {
  encode(message: Tube, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pathId !== 0) {
      writer.uint32(8).uint32(message.pathId);
    }
    if (message.isGrowing === true) {
      writer.uint32(16).bool(message.isGrowing);
    }
    if (message.radius !== undefined) {
      ScalarProperty.encode(message.radius, writer.uint32(26).fork()).ldelim();
    }
    if (message.color !== undefined) {
      ColorProperty.encode(message.color, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tube {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTube();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.pathId = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.isGrowing = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.radius = ScalarProperty.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): Tube {
    return {
      pathId: isSet(object.pathId) ? Number(object.pathId) : 0,
      isGrowing: isSet(object.isGrowing) ? Boolean(object.isGrowing) : false,
      radius: isSet(object.radius) ? ScalarProperty.fromJSON(object.radius) : undefined,
      color: isSet(object.color) ? ColorProperty.fromJSON(object.color) : undefined,
    };
  },

  toJSON(message: Tube): unknown {
    const obj: any = {};
    if (message.pathId !== 0) {
      obj.pathId = Math.round(message.pathId);
    }
    if (message.isGrowing === true) {
      obj.isGrowing = message.isGrowing;
    }
    if (message.radius !== undefined) {
      obj.radius = ScalarProperty.toJSON(message.radius);
    }
    if (message.color !== undefined) {
      obj.color = ColorProperty.toJSON(message.color);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Tube>, I>>(base?: I): Tube {
    return Tube.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Tube>, I>>(object: I): Tube {
    const message = createBaseTube();
    message.pathId = object.pathId ?? 0;
    message.isGrowing = object.isGrowing ?? false;
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
