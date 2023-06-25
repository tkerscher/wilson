/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ScalarProperty } from "./properties";

export const protobufPackage = "wilson";

/** Text positioning */
export enum TextPosition {
  /** CENTER - Center of screen */
  CENTER = 0,
  /** UPPER_RIGHT - Upper right corner */
  UPPER_RIGHT = 1,
  /** TOP - Middle of top side */
  TOP = 2,
  /** UPPER_LEFT - Upper left corner */
  UPPER_LEFT = 3,
  /** LEFT - Middle of the left side */
  LEFT = 4,
  /** LOWER_LEFT - Lower left corner */
  LOWER_LEFT = 5,
  /** BOTTOM - Middle of the bottom side */
  BOTTOM = 6,
  /** LOWER_RIGHT - Lower right corner */
  LOWER_RIGHT = 7,
  /** RIGHT - Middle of right side */
  RIGHT = 8,
  UNRECOGNIZED = -1,
}

export function textPositionFromJSON(object: any): TextPosition {
  switch (object) {
    case 0:
    case "CENTER":
      return TextPosition.CENTER;
    case 1:
    case "UPPER_RIGHT":
      return TextPosition.UPPER_RIGHT;
    case 2:
    case "TOP":
      return TextPosition.TOP;
    case 3:
    case "UPPER_LEFT":
      return TextPosition.UPPER_LEFT;
    case 4:
    case "LEFT":
      return TextPosition.LEFT;
    case 5:
    case "LOWER_LEFT":
      return TextPosition.LOWER_LEFT;
    case 6:
    case "BOTTOM":
      return TextPosition.BOTTOM;
    case 7:
    case "LOWER_RIGHT":
      return TextPosition.LOWER_RIGHT;
    case 8:
    case "RIGHT":
      return TextPosition.RIGHT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TextPosition.UNRECOGNIZED;
  }
}

export function textPositionToJSON(object: TextPosition): string {
  switch (object) {
    case TextPosition.CENTER:
      return "CENTER";
    case TextPosition.UPPER_RIGHT:
      return "UPPER_RIGHT";
    case TextPosition.TOP:
      return "TOP";
    case TextPosition.UPPER_LEFT:
      return "UPPER_LEFT";
    case TextPosition.LEFT:
      return "LEFT";
    case TextPosition.LOWER_LEFT:
      return "LOWER_LEFT";
    case TextPosition.BOTTOM:
      return "BOTTOM";
    case TextPosition.LOWER_RIGHT:
      return "LOWER_RIGHT";
    case TextPosition.RIGHT:
      return "RIGHT";
    case TextPosition.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Overlay text drawn on the scene surface */
export interface Overlay {
  /** Text to be drawn on the scene */
  text: string;
  /** Position of the text */
  position: TextPosition;
  /** Font style */
  fontSize: ScalarProperty | undefined;
  bold: boolean;
  italic: boolean;
}

function createBaseOverlay(): Overlay {
  return { text: "", position: 0, fontSize: undefined, bold: false, italic: false };
}

export const Overlay = {
  encode(message: Overlay, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    if (message.position !== 0) {
      writer.uint32(16).int32(message.position);
    }
    if (message.fontSize !== undefined) {
      ScalarProperty.encode(message.fontSize, writer.uint32(26).fork()).ldelim();
    }
    if (message.bold === true) {
      writer.uint32(32).bool(message.bold);
    }
    if (message.italic === true) {
      writer.uint32(40).bool(message.italic);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Overlay {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOverlay();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.text = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.position = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.fontSize = ScalarProperty.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.bold = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.italic = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Overlay {
    return {
      text: isSet(object.text) ? String(object.text) : "",
      position: isSet(object.position) ? textPositionFromJSON(object.position) : 0,
      fontSize: isSet(object.fontSize) ? ScalarProperty.fromJSON(object.fontSize) : undefined,
      bold: isSet(object.bold) ? Boolean(object.bold) : false,
      italic: isSet(object.italic) ? Boolean(object.italic) : false,
    };
  },

  toJSON(message: Overlay): unknown {
    const obj: any = {};
    message.text !== undefined && (obj.text = message.text);
    message.position !== undefined && (obj.position = textPositionToJSON(message.position));
    message.fontSize !== undefined &&
      (obj.fontSize = message.fontSize ? ScalarProperty.toJSON(message.fontSize) : undefined);
    message.bold !== undefined && (obj.bold = message.bold);
    message.italic !== undefined && (obj.italic = message.italic);
    return obj;
  },

  create<I extends Exact<DeepPartial<Overlay>, I>>(base?: I): Overlay {
    return Overlay.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Overlay>, I>>(object: I): Overlay {
    const message = createBaseOverlay();
    message.text = object.text ?? "";
    message.position = object.position ?? 0;
    message.fontSize = (object.fontSize !== undefined && object.fontSize !== null)
      ? ScalarProperty.fromPartial(object.fontSize)
      : undefined;
    message.bold = object.bold ?? false;
    message.italic = object.italic ?? false;
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
