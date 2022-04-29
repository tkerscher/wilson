/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { VectorProperty } from "./properties";

export const protobufPackage = "p1on";

/** Virtual camera dictating the point of view rendered in 3D mode */
export interface Camera {
  /** position of camera */
  position: VectorProperty | undefined;
  /** target the camera looks at */
  target: VectorProperty | undefined;
}

function createBaseCamera(): Camera {
  return { position: undefined, target: undefined };
}

export const Camera = {
  encode(
    message: Camera,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.position !== undefined) {
      VectorProperty.encode(
        message.position,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.target !== undefined) {
      VectorProperty.encode(message.target, writer.uint32(18).fork()).ldelim();
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
          message.position = VectorProperty.decode(reader, reader.uint32());
          break;
        case 2:
          message.target = VectorProperty.decode(reader, reader.uint32());
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
      position: isSet(object.position)
        ? VectorProperty.fromJSON(object.position)
        : undefined,
      target: isSet(object.target)
        ? VectorProperty.fromJSON(object.target)
        : undefined,
    };
  },

  toJSON(message: Camera): unknown {
    const obj: any = {};
    message.position !== undefined &&
      (obj.position = message.position
        ? VectorProperty.toJSON(message.position)
        : undefined);
    message.target !== undefined &&
      (obj.target = message.target
        ? VectorProperty.toJSON(message.target)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Camera>, I>>(object: I): Camera {
    const message = createBaseCamera();
    message.position =
      object.position !== undefined && object.position !== null
        ? VectorProperty.fromPartial(object.position)
        : undefined;
    message.target =
      object.target !== undefined && object.target !== null
        ? VectorProperty.fromPartial(object.target)
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
