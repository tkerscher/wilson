/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "p1on";

/** Methods to interpolate the discrete values in time */
export enum Interpolation {
  /** STEP - Hold value until a newer one appears */
  STEP = 0,
  /** LINEAR - Linear interpolation inbetween stops */
  LINEAR = 1,
  /** CUBIC - Cubic (smooth) interpolation inbetween stops */
  CUBIC = 2,
  UNRECOGNIZED = -1,
}

export function interpolationFromJSON(object: any): Interpolation {
  switch (object) {
    case 0:
    case "STEP":
      return Interpolation.STEP;
    case 1:
    case "LINEAR":
      return Interpolation.LINEAR;
    case 2:
    case "CUBIC":
      return Interpolation.CUBIC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Interpolation.UNRECOGNIZED;
  }
}

export function interpolationToJSON(object: Interpolation): string {
  switch (object) {
    case Interpolation.STEP:
      return "STEP";
    case Interpolation.LINEAR:
      return "LINEAR";
    case Interpolation.CUBIC:
      return "CUBIC";
    default:
      return "UNKNOWN";
  }
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
