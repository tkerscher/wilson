/* eslint-disable */
import { Timestamp } from "./google/protobuf/timestamp";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "p1on";

/** Meta information about a project */
export interface ProjectMeta {
  /** Name of the project */
  name: string;
  /** Author of the project */
  author: string;
  /** Date of event */
  date: Date | undefined;
  /** Time value, from which the animation starts */
  startTime: number;
  /** Time value, where the animation ends */
  endTime: number;
  /** Playback speed in time units per second */
  speedRatio: number;
}

function createBaseProjectMeta(): ProjectMeta {
  return {
    name: "",
    author: "",
    date: undefined,
    startTime: 0,
    endTime: 0,
    speedRatio: 0,
  };
}

export const ProjectMeta = {
  encode(
    message: ProjectMeta,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.author !== "") {
      writer.uint32(18).string(message.author);
    }
    if (message.date !== undefined) {
      Timestamp.encode(
        toTimestamp(message.date),
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.startTime !== 0) {
      writer.uint32(33).double(message.startTime);
    }
    if (message.endTime !== 0) {
      writer.uint32(41).double(message.endTime);
    }
    if (message.speedRatio !== 0) {
      writer.uint32(49).double(message.speedRatio);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProjectMeta {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProjectMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.author = reader.string();
          break;
        case 3:
          message.date = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.startTime = reader.double();
          break;
        case 5:
          message.endTime = reader.double();
          break;
        case 6:
          message.speedRatio = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProjectMeta {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      author: isSet(object.author) ? String(object.author) : "",
      date: isSet(object.date) ? fromJsonTimestamp(object.date) : undefined,
      startTime: isSet(object.startTime) ? Number(object.startTime) : 0,
      endTime: isSet(object.endTime) ? Number(object.endTime) : 0,
      speedRatio: isSet(object.speedRatio) ? Number(object.speedRatio) : 0,
    };
  },

  toJSON(message: ProjectMeta): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.author !== undefined && (obj.author = message.author);
    message.date !== undefined && (obj.date = message.date.toISOString());
    message.startTime !== undefined && (obj.startTime = message.startTime);
    message.endTime !== undefined && (obj.endTime = message.endTime);
    message.speedRatio !== undefined && (obj.speedRatio = message.speedRatio);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProjectMeta>, I>>(
    object: I
  ): ProjectMeta {
    const message = createBaseProjectMeta();
    message.name = object.name ?? "";
    message.author = object.author ?? "";
    message.date = object.date ?? undefined;
    message.startTime = object.startTime ?? 0;
    message.endTime = object.endTime ?? 0;
    message.speedRatio = object.speedRatio ?? 0;
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
