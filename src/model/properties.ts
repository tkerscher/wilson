/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Color } from "./color";
import { Vector } from "./vector";

export const protobufPackage = "wilson";

/** Animatible scalar property */
export interface ScalarProperty {
  source?: { $case: "constValue"; constValue: number } | { $case: "graphId"; graphId: number };
}

/** Animatible vector property */
export interface VectorProperty {
  source?: { $case: "constValue"; constValue: Vector } | { $case: "pathId"; pathId: number };
}

/** Animatible color property */
export interface ColorProperty {
  source?: { $case: "constValue"; constValue: Color } | { $case: "graphId"; graphId: number } | {
    $case: "scalarValue";
    scalarValue: number;
  };
}

function createBaseScalarProperty(): ScalarProperty {
  return { source: undefined };
}

export const ScalarProperty = {
  encode(message: ScalarProperty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    switch (message.source?.$case) {
      case "constValue":
        writer.uint32(9).double(message.source.constValue);
        break;
      case "graphId":
        writer.uint32(16).uint32(message.source.graphId);
        break;
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScalarProperty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScalarProperty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.source = { $case: "constValue", constValue: reader.double() };
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.source = { $case: "graphId", graphId: reader.uint32() };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScalarProperty {
    return {
      source: isSet(object.constValue)
        ? { $case: "constValue", constValue: Number(object.constValue) }
        : isSet(object.graphId)
        ? { $case: "graphId", graphId: Number(object.graphId) }
        : undefined,
    };
  },

  toJSON(message: ScalarProperty): unknown {
    const obj: any = {};
    message.source?.$case === "constValue" && (obj.constValue = message.source?.constValue);
    message.source?.$case === "graphId" && (obj.graphId = Math.round(message.source?.graphId));
    return obj;
  },

  create<I extends Exact<DeepPartial<ScalarProperty>, I>>(base?: I): ScalarProperty {
    return ScalarProperty.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ScalarProperty>, I>>(object: I): ScalarProperty {
    const message = createBaseScalarProperty();
    if (
      object.source?.$case === "constValue" &&
      object.source?.constValue !== undefined &&
      object.source?.constValue !== null
    ) {
      message.source = { $case: "constValue", constValue: object.source.constValue };
    }
    if (object.source?.$case === "graphId" && object.source?.graphId !== undefined && object.source?.graphId !== null) {
      message.source = { $case: "graphId", graphId: object.source.graphId };
    }
    return message;
  },
};

function createBaseVectorProperty(): VectorProperty {
  return { source: undefined };
}

export const VectorProperty = {
  encode(message: VectorProperty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    switch (message.source?.$case) {
      case "constValue":
        Vector.encode(message.source.constValue, writer.uint32(10).fork()).ldelim();
        break;
      case "pathId":
        writer.uint32(16).uint32(message.source.pathId);
        break;
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VectorProperty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVectorProperty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.source = { $case: "constValue", constValue: Vector.decode(reader, reader.uint32()) };
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.source = { $case: "pathId", pathId: reader.uint32() };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VectorProperty {
    return {
      source: isSet(object.constValue)
        ? { $case: "constValue", constValue: Vector.fromJSON(object.constValue) }
        : isSet(object.pathId)
        ? { $case: "pathId", pathId: Number(object.pathId) }
        : undefined,
    };
  },

  toJSON(message: VectorProperty): unknown {
    const obj: any = {};
    message.source?.$case === "constValue" &&
      (obj.constValue = message.source?.constValue ? Vector.toJSON(message.source?.constValue) : undefined);
    message.source?.$case === "pathId" && (obj.pathId = Math.round(message.source?.pathId));
    return obj;
  },

  create<I extends Exact<DeepPartial<VectorProperty>, I>>(base?: I): VectorProperty {
    return VectorProperty.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VectorProperty>, I>>(object: I): VectorProperty {
    const message = createBaseVectorProperty();
    if (
      object.source?.$case === "constValue" &&
      object.source?.constValue !== undefined &&
      object.source?.constValue !== null
    ) {
      message.source = { $case: "constValue", constValue: Vector.fromPartial(object.source.constValue) };
    }
    if (object.source?.$case === "pathId" && object.source?.pathId !== undefined && object.source?.pathId !== null) {
      message.source = { $case: "pathId", pathId: object.source.pathId };
    }
    return message;
  },
};

function createBaseColorProperty(): ColorProperty {
  return { source: undefined };
}

export const ColorProperty = {
  encode(message: ColorProperty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    switch (message.source?.$case) {
      case "constValue":
        Color.encode(message.source.constValue, writer.uint32(10).fork()).ldelim();
        break;
      case "graphId":
        writer.uint32(16).uint32(message.source.graphId);
        break;
      case "scalarValue":
        writer.uint32(25).double(message.source.scalarValue);
        break;
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ColorProperty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseColorProperty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.source = { $case: "constValue", constValue: Color.decode(reader, reader.uint32()) };
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.source = { $case: "graphId", graphId: reader.uint32() };
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.source = { $case: "scalarValue", scalarValue: reader.double() };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ColorProperty {
    return {
      source: isSet(object.constValue)
        ? { $case: "constValue", constValue: Color.fromJSON(object.constValue) }
        : isSet(object.graphId)
        ? { $case: "graphId", graphId: Number(object.graphId) }
        : isSet(object.scalarValue)
        ? { $case: "scalarValue", scalarValue: Number(object.scalarValue) }
        : undefined,
    };
  },

  toJSON(message: ColorProperty): unknown {
    const obj: any = {};
    message.source?.$case === "constValue" &&
      (obj.constValue = message.source?.constValue ? Color.toJSON(message.source?.constValue) : undefined);
    message.source?.$case === "graphId" && (obj.graphId = Math.round(message.source?.graphId));
    message.source?.$case === "scalarValue" && (obj.scalarValue = message.source?.scalarValue);
    return obj;
  },

  create<I extends Exact<DeepPartial<ColorProperty>, I>>(base?: I): ColorProperty {
    return ColorProperty.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ColorProperty>, I>>(object: I): ColorProperty {
    const message = createBaseColorProperty();
    if (
      object.source?.$case === "constValue" &&
      object.source?.constValue !== undefined &&
      object.source?.constValue !== null
    ) {
      message.source = { $case: "constValue", constValue: Color.fromPartial(object.source.constValue) };
    }
    if (object.source?.$case === "graphId" && object.source?.graphId !== undefined && object.source?.graphId !== null) {
      message.source = { $case: "graphId", graphId: object.source.graphId };
    }
    if (
      object.source?.$case === "scalarValue" &&
      object.source?.scalarValue !== undefined &&
      object.source?.scalarValue !== null
    ) {
      message.source = { $case: "scalarValue", scalarValue: object.source.scalarValue };
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
