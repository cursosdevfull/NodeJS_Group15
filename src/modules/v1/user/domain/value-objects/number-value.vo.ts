import { VO } from "./vo";

export class NumberValueVO extends VO<number> {
  static create(value: number, min: number, attribute: string) {
    if (value < min) {
      throw new Error(`${attribute} must be greater than ${value}`);
    }

    return new NumberValueVO(value);
  }
}
