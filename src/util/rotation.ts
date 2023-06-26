import { Axis } from "@babylonjs/core/Maths/math.axis";
import { Quaternion, Vector3 } from "@babylonjs/core/Maths/math.vector";
import { setProperty } from "./property";

export class RotationProxy {
    target: any;
    property: string;

    #baseRot: Quaternion;
    #normal = new Vector3();
    #rotation = 0.0;

    //reserve memory for quaternion calc to ease the GC use
    #quatNormal: Quaternion = new Quaternion();
    #quatRot: Quaternion = new Quaternion();
    #quatRes: Quaternion = new Quaternion();

    constructor(
        target: any,
        property: string,
        baseRotation: Quaternion = Quaternion.Identity()
    ) {
        this.target = target;
        this.property = property;

        this.#baseRot = baseRotation;
    }

    get normal(): Vector3 {
        return this.#normal;
    }
    set normal(value: Vector3) {
        if (value.lengthSquared() <= 1e-5)
            this.#normal = Axis.Z;
        else
            value.normalizeToRef(this.#normal);
        this.#update();
    }

    get rotation(): number {
        return this.#rotation;
    }
    set rotation(value: number) {
        this.#rotation = value;
        this.#update();
    }

    #update(): void {
        //Update operands
        Quaternion.FromUnitVectorsToRef(Axis.Z, this.#normal, this.#quatNormal);
        Quaternion.RotationAxisToRef(this.#normal, this.#rotation, this.#quatRot);

        //calc quat
        this.#quatRot.multiplyToRef(this.#quatNormal, this.#quatRes);
        this.#quatRes.multiplyInPlace(this.#baseRot);

        setProperty(this.target, this.property, this.#quatRes);
    }
}
