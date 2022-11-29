/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ColorProperty, ScalarProperty } from "./properties";

export const protobufPackage = "wilson";

/** Tube in 3D space */
export interface Tube {
  /** Name as shown in explorer */
  name: string;
  /** Name of groups this belongs to */
  groups: string[];
  /** Additional text shown when selected */
  description: string;
  /** Color of the tube at a certain point identified by time */
  color:
    | ColorProperty
    | undefined;
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
  return { name: "", groups: [], description: "", color: undefined, pathId: 0, isGrowing: false, radius: undefined };
}

export const Tube = {
  encode(message: Tube, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.groups) {
      writer.uint32(18).string(v!);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.color !== undefined) {
      ColorProperty.encode(message.color, writer.uint32(34).fork()).ldelim();
    }
    if (message.pathId !== 0) {
      writer.uint32(80).uint32(message.pathId);
    }
    if (message.isGrowing === true) {
      writer.uint32(88).bool(message.isGrowing);
    }
    if (message.radius !== undefined) {
      ScalarProperty.encode(message.radius, writer.uint32(98).fork()).ldelim();
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
          message.groups.push(reader.string());
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.color = ColorProperty.decode(reader, reader.uint32());
          break;
        case 10:
          message.pathId = reader.uint32();
          break;
        case 11:
          message.isGrowing = reader.bool();
          break;
        case 12:
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
      groups: Array.isArray(object?.groups) ? object.groups.map((e: any) => String(e)) : [],
      description: isSet(object.description) ? String(object.description) : "",
      color: isSet(object.color) ? ColorProperty.fromJSON(object.color) : undefined,
      pathId: isSet(object.pathId) ? Number(object.pathId) : 0,
      isGrowing: isSet(object.isGrowing) ? Boolean(object.isGrowing) : false,
      radius: isSet(object.radius) ? ScalarProperty.fromJSON(object.radius) : undefined,
    };
  },

  toJSON(message: Tube): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.groups) {
      obj.groups = message.groups.map((e) => e);
    } else {
      obj.groups = [];
    }
    message.description !== undefined && (obj.description = message.description);
    message.color !== undefined && (obj.color = message.color ? ColorProperty.toJSON(message.color) : undefined);
    message.pathId !== undefined && (obj.pathId = Math.round(message.pathId));
    message.isGrowing !== undefined && (obj.isGrowing = message.isGrowing);
    message.radius !== undefined && (obj.radius = message.radius ? ScalarProperty.toJSON(message.radius) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Tube>, I>>(object: I): Tube {
    const message = createBaseTube();
    message.name = object.name ?? "";
    message.groups = object.groups?.map((e) => e) || [];
    message.description = object.description ?? "";
    message.color = (object.color !== undefined && object.color !== null)
      ? ColorProperty.fromPartial(object.color)
      : undefined;
    message.pathId = object.pathId ?? 0;
    message.isGrowing = object.isGrowing ?? false;
    message.radius = (object.radius !== undefined && object.radius !== null)
      ? ScalarProperty.fromPartial(object.radius)
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
