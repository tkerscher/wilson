/* eslint-disable */

export const protobufPackage = "p1on";

/** Interpolation modes */
export enum Interpolation {
  /** LINEAR - Linear interpolate between consecutive data points */
  LINEAR = 0,
  /** HOLD - Hold the last value until next data point is reached */
  HOLD = 1,
  /** AHEAD - Hold the next value until next data point is reached */
  AHEAD = 2,
  /**
   * STEP - Hold last value until exactly inbetween two consecutive data points
   * when it will hold the next value
   */
  STEP = 3,
  UNRECOGNIZED = -1,
}

export function interpolationFromJSON(object: any): Interpolation {
  switch (object) {
    case 0:
    case "LINEAR":
      return Interpolation.LINEAR;
    case 1:
    case "HOLD":
      return Interpolation.HOLD;
    case 2:
    case "AHEAD":
      return Interpolation.AHEAD;
    case 3:
    case "STEP":
      return Interpolation.STEP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Interpolation.UNRECOGNIZED;
  }
}

export function interpolationToJSON(object: Interpolation): string {
  switch (object) {
    case Interpolation.LINEAR:
      return "LINEAR";
    case Interpolation.HOLD:
      return "HOLD";
    case Interpolation.AHEAD:
      return "AHEAD";
    case Interpolation.STEP:
      return "STEP";
    case Interpolation.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
