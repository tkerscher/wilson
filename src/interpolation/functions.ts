import { IEasingFunction } from "@babylonjs/core/Animations/easing"
import { Interpolation } from "../model/interpolation"

//Easing function corresponding to the interpolation modes of the data model

const Hold: IEasingFunction = {
    ease: (gradient) => 0.0
}

const Ahead: IEasingFunction = {
    ease: (gradient) => 1.0
}

const Step: IEasingFunction = {
    ease: (gradient) => gradient <= 0.5 ? 0.0 : 1.0
}

//Helper function

export function getInterpolation(int: Interpolation): IEasingFunction|null {
    switch (int) {
        case Interpolation.AHEAD:
            return Ahead
        case Interpolation.HOLD:
            return Hold
        case Interpolation.STEP:
            return Step
        case Interpolation.LINEAR:
        case Interpolation.UNRECOGNIZED:
        default:
            return null
    }
}
