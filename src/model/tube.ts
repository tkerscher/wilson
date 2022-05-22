/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { ColorProperty, ScalarProperty } from "./properties";

export const protobufPackage = "p1on";

/** Tube in 3D space */
export interface Tube {
  /** Name as shown in explorer */
  name: string;
  /** Additional text shown when selected */
  description: string;
  /** True, if visible in 3D viewer */
  isVisible: boolean;
  /** Color of the tube at a certain point identified by time */
  color: ColorProperty | undefined;
  /** Index of path to follow */
  pathId: number;
  /**
   * True if the tube is growing with time,
   * or false, if the tube is always drawn complete
   */
  isGrowing: boolean;
  /** Radius of the tube at a certain point identified by time */
  radius: ScalarProperty | undefined;
}

function createBaseTube(): Tube {
  return {
    name: "",
    description: "",
    isVisible: false,
    color: undefined,
    pathId: 0,
    isGrowing: false,
    radius: undefined,
  };
}

export const Tube = {
  encode(message: Tube, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    if (message.pathId !== 0) {
      writer.uint32(40).uint32(message.pathId);
    }
    if (message.isGrowing === true) {
      writer.uint32(48).bool(message.isGrowing);
    }
    if (message.radius !== undefined) {
      ScalarProperty.encode(message.radius, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tube {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTube();
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
          message.pathId = reader.uint32();
          break;
        case 6:
          message.isGrowing = reader.bool();
          break;
        case 7:
          message.radius = ScalarProperty.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Tube {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      isVisible: isSet(object.isVisible) ? Boolean(object.isVisible) : false,
      color: isSet(object.color)
        ? ColorProperty.fromJSON(object.color)
        : undefined,
      pathId: isSet(object.pathId) ? Number(object.pathId) : 0,
      isGrowing: isSet(object.isGrowing) ? Boolean(object.isGrowing) : false,
      radius: isSet(object.radius)
        ? ScalarProperty.fromJSON(object.radius)
        : undefined,
    };
  },

  toJSON(message: Tube): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.isVisible !== undefined && (obj.isVisible = message.isVisible);
    message.color !== undefined &&
      (obj.color = message.color
        ? ColorProperty.toJSON(message.color)
        : undefined);
    message.pathId !== undefined && (obj.pathId = Math.round(message.pathId));
    message.isGrowing !== undefined && (obj.isGrowing = message.isGrowing);
    message.radius !== undefined &&
      (obj.radius = message.radius
        ? ScalarProperty.toJSON(message.radius)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Tube>, I>>(object: I): Tube {
    const message = createBaseTube();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.isVisible = object.isVisible ?? false;
    message.color =
      object.color !== undefined && object.color !== null
        ? ColorProperty.fromPartial(object.color)
        : undefined;
    message.pathId = object.pathId ?? 0;
    message.isGrowing = object.isGrowing ?? false;
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
