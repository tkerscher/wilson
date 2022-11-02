/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Vector } from "./vector";

export const protobufPackage = "wilson";

/** Virtual camera dictating the point of view rendered in 3D mode */
export interface Camera {
  /** position of camera */
  position:
    | Vector
    | undefined;
  /** target the camera looks at */
  target: Vector | undefined;
}

function createBaseCamera(): Camera {
  return { position: undefined, target: undefined };
}

export const Camera = {
  encode(message: Camera, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.position !== undefined) {
      Vector.encode(message.position, writer.uint32(10).fork()).ldelim();
    }
    if (message.target !== undefined) {
      Vector.encode(message.target, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Camera {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCamera();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.position = Vector.decode(reader, reader.uint32());
          break;
        case 2:
          message.target = Vector.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Camera {
    return {
      position: isSet(object.position) ? Vector.fromJSON(object.position) : undefined,
      target: isSet(object.target) ? Vector.fromJSON(object.target) : undefined,
    };
  },

  toJSON(message: Camera): unknown {
    const obj: any = {};
    message.position !== undefined && (obj.position = message.position ? Vector.toJSON(message.position) : undefined);
    message.target !== undefined && (obj.target = message.target ? Vector.toJSON(message.target) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Camera>, I>>(object: I): Camera {
    const message = createBaseCamera();
    message.position = (object.position !== undefined && object.position !== null)
      ? Vector.fromPartial(object.position)
      : undefined;
    message.target = (object.target !== undefined && object.target !== null)
      ? Vector.fromPartial(object.target)
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
