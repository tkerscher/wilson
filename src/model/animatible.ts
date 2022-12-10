/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Line } from "./line";
import { Overlay } from "./overlay";
import { Sphere } from "./sphere";
import { Tube } from "./tube";

export const protobufPackage = "wilson";

/** Animatible object in the scene */
export interface Animatible {
  /** Name as shown in explorer */
  name: string;
  /** Name of groups this belongs to */
  groups: string[];
  /** Additional text shown when selected */
  description: string;
  instance?: { $case: "sphere"; sphere: Sphere } | { $case: "line"; line: Line } | { $case: "tube"; tube: Tube } | {
    $case: "overlay";
    overlay: Overlay;
  };
}

function createBaseAnimatible(): Animatible {
  return { name: "", groups: [], description: "", instance: undefined };
}

export const Animatible = {
  encode(message: Animatible, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.groups) {
      writer.uint32(18).string(v!);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.instance?.$case === "sphere") {
      Sphere.encode(message.instance.sphere, writer.uint32(130).fork()).ldelim();
    }
    if (message.instance?.$case === "line") {
      Line.encode(message.instance.line, writer.uint32(138).fork()).ldelim();
    }
    if (message.instance?.$case === "tube") {
      Tube.encode(message.instance.tube, writer.uint32(146).fork()).ldelim();
    }
    if (message.instance?.$case === "overlay") {
      Overlay.encode(message.instance.overlay, writer.uint32(154).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Animatible {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnimatible();
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
        case 16:
          message.instance = { $case: "sphere", sphere: Sphere.decode(reader, reader.uint32()) };
          break;
        case 17:
          message.instance = { $case: "line", line: Line.decode(reader, reader.uint32()) };
          break;
        case 18:
          message.instance = { $case: "tube", tube: Tube.decode(reader, reader.uint32()) };
          break;
        case 19:
          message.instance = { $case: "overlay", overlay: Overlay.decode(reader, reader.uint32()) };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Animatible {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      groups: Array.isArray(object?.groups) ? object.groups.map((e: any) => String(e)) : [],
      description: isSet(object.description) ? String(object.description) : "",
      instance: isSet(object.sphere)
        ? { $case: "sphere", sphere: Sphere.fromJSON(object.sphere) }
        : isSet(object.line)
        ? { $case: "line", line: Line.fromJSON(object.line) }
        : isSet(object.tube)
        ? { $case: "tube", tube: Tube.fromJSON(object.tube) }
        : isSet(object.overlay)
        ? { $case: "overlay", overlay: Overlay.fromJSON(object.overlay) }
        : undefined,
    };
  },

  toJSON(message: Animatible): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.groups) {
      obj.groups = message.groups.map((e) => e);
    } else {
      obj.groups = [];
    }
    message.description !== undefined && (obj.description = message.description);
    message.instance?.$case === "sphere" &&
      (obj.sphere = message.instance?.sphere ? Sphere.toJSON(message.instance?.sphere) : undefined);
    message.instance?.$case === "line" &&
      (obj.line = message.instance?.line ? Line.toJSON(message.instance?.line) : undefined);
    message.instance?.$case === "tube" &&
      (obj.tube = message.instance?.tube ? Tube.toJSON(message.instance?.tube) : undefined);
    message.instance?.$case === "overlay" &&
      (obj.overlay = message.instance?.overlay ? Overlay.toJSON(message.instance?.overlay) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Animatible>, I>>(object: I): Animatible {
    const message = createBaseAnimatible();
    message.name = object.name ?? "";
    message.groups = object.groups?.map((e) => e) || [];
    message.description = object.description ?? "";
    if (
      object.instance?.$case === "sphere" && object.instance?.sphere !== undefined && object.instance?.sphere !== null
    ) {
      message.instance = { $case: "sphere", sphere: Sphere.fromPartial(object.instance.sphere) };
    }
    if (object.instance?.$case === "line" && object.instance?.line !== undefined && object.instance?.line !== null) {
      message.instance = { $case: "line", line: Line.fromPartial(object.instance.line) };
    }
    if (object.instance?.$case === "tube" && object.instance?.tube !== undefined && object.instance?.tube !== null) {
      message.instance = { $case: "tube", tube: Tube.fromPartial(object.instance.tube) };
    }
    if (
      object.instance?.$case === "overlay" &&
      object.instance?.overlay !== undefined &&
      object.instance?.overlay !== null
    ) {
      message.instance = { $case: "overlay", overlay: Overlay.fromPartial(object.instance.overlay) };
    }
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
