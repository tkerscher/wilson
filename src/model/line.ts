/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ColorProperty, ScalarProperty, VectorProperty } from "./properties";

export const protobufPackage = "wilson";

/** Animated line in 3D space */
export interface Line {
  /** start position */
  start:
    | VectorProperty
    | undefined;
  /** end position */
  end:
    | VectorProperty
    | undefined;
  /** Line diameter */
  lineWidth:
    | ScalarProperty
    | undefined;
  /** Line color */
  color:
    | ColorProperty
    | undefined;
  /** true, if there should be a cone pointing toward the start point */
  pointForward: boolean;
  /** true, if there should be a cone pointing toward the end point */
  pointBackward: boolean;
}

function createBaseLine(): Line {
  return {
    start: undefined,
    end: undefined,
    lineWidth: undefined,
    color: undefined,
    pointForward: false,
    pointBackward: false,
  };
}

export const Line = {
  encode(message: Line, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.start !== undefined) {
      VectorProperty.encode(message.start, writer.uint32(10).fork()).ldelim();
    }
    if (message.end !== undefined) {
      VectorProperty.encode(message.end, writer.uint32(18).fork()).ldelim();
    }
    if (message.lineWidth !== undefined) {
      ScalarProperty.encode(message.lineWidth, writer.uint32(26).fork()).ldelim();
    }
    if (message.color !== undefined) {
      ColorProperty.encode(message.color, writer.uint32(34).fork()).ldelim();
    }
    if (message.pointForward === true) {
      writer.uint32(40).bool(message.pointForward);
    }
    if (message.pointBackward === true) {
      writer.uint32(48).bool(message.pointBackward);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Line {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLine();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.start = VectorProperty.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.end = VectorProperty.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.lineWidth = ScalarProperty.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.color = ColorProperty.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.pointForward = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.pointBackward = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Line {
    return {
      start: isSet(object.start) ? VectorProperty.fromJSON(object.start) : undefined,
      end: isSet(object.end) ? VectorProperty.fromJSON(object.end) : undefined,
      lineWidth: isSet(object.lineWidth) ? ScalarProperty.fromJSON(object.lineWidth) : undefined,
      color: isSet(object.color) ? ColorProperty.fromJSON(object.color) : undefined,
      pointForward: isSet(object.pointForward) ? Boolean(object.pointForward) : false,
      pointBackward: isSet(object.pointBackward) ? Boolean(object.pointBackward) : false,
    };
  },

  toJSON(message: Line): unknown {
    const obj: any = {};
    if (message.start !== undefined) {
      obj.start = VectorProperty.toJSON(message.start);
    }
    if (message.end !== undefined) {
      obj.end = VectorProperty.toJSON(message.end);
    }
    if (message.lineWidth !== undefined) {
      obj.lineWidth = ScalarProperty.toJSON(message.lineWidth);
    }
    if (message.color !== undefined) {
      obj.color = ColorProperty.toJSON(message.color);
    }
    if (message.pointForward === true) {
      obj.pointForward = message.pointForward;
    }
    if (message.pointBackward === true) {
      obj.pointBackward = message.pointBackward;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Line>, I>>(base?: I): Line {
    return Line.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Line>, I>>(object: I): Line {
    const message = createBaseLine();
    message.start = (object.start !== undefined && object.start !== null)
      ? VectorProperty.fromPartial(object.start)
      : undefined;
    message.end = (object.end !== undefined && object.end !== null)
      ? VectorProperty.fromPartial(object.end)
      : undefined;
    message.lineWidth = (object.lineWidth !== undefined && object.lineWidth !== null)
      ? ScalarProperty.fromPartial(object.lineWidth)
      : undefined;
    message.color = (object.color !== undefined && object.color !== null)
      ? ColorProperty.fromPartial(object.color)
      : undefined;
    message.pointForward = object.pointForward ?? false;
    message.pointBackward = object.pointBackward ?? false;
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
