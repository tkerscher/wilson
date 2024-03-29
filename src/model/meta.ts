/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "wilson";

/** Meta information about a project */
export interface ProjectMeta {
  /** Name of the project */
  name: string;
  /** Author of the project */
  author: string;
  /** Date of event */
  date:
    | Timestamp
    | undefined;
  /** Time value, from which the animation starts */
  startTime: number;
  /** Time value, where the animation ends */
  endTime: number;
  /** Playback speed in time units per second */
  speedRatio: number;
  /** additional description of the event */
  description: string;
}

function createBaseProjectMeta(): ProjectMeta {
  return { name: "", author: "", date: undefined, startTime: 0, endTime: 0, speedRatio: 0, description: "" };
}

export const ProjectMeta = {
  encode(message: ProjectMeta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.author !== "") {
      writer.uint32(18).string(message.author);
    }
    if (message.date !== undefined) {
      Timestamp.encode(message.date, writer.uint32(26).fork()).ldelim();
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
    if (message.description !== "") {
      writer.uint32(58).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProjectMeta {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProjectMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.author = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.date = Timestamp.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.startTime = reader.double();
          continue;
        case 5:
          if (tag !== 41) {
            break;
          }

          message.endTime = reader.double();
          continue;
        case 6:
          if (tag !== 49) {
            break;
          }

          message.speedRatio = reader.double();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: ProjectMeta): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.author !== "") {
      obj.author = message.author;
    }
    if (message.date !== undefined) {
      obj.date = fromTimestamp(message.date).toISOString();
    }
    if (message.startTime !== 0) {
      obj.startTime = message.startTime;
    }
    if (message.endTime !== 0) {
      obj.endTime = message.endTime;
    }
    if (message.speedRatio !== 0) {
      obj.speedRatio = message.speedRatio;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProjectMeta>, I>>(base?: I): ProjectMeta {
    return ProjectMeta.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ProjectMeta>, I>>(object: I): ProjectMeta {
    const message = createBaseProjectMeta();
    message.name = object.name ?? "";
    message.author = object.author ?? "";
    message.date = (object.date !== undefined && object.date !== null) ? Timestamp.fromPartial(object.date) : undefined;
    message.startTime = object.startTime ?? 0;
    message.endTime = object.endTime ?? 0;
    message.speedRatio = object.speedRatio ?? 0;
    message.description = object.description ?? "";
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Timestamp {
  if (o instanceof Date) {
    return toTimestamp(o);
  } else if (typeof o === "string") {
    return toTimestamp(new Date(o));
  } else {
    return Timestamp.fromJSON(o);
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
