import { VO } from "./vo";

export class StringLengthVO extends VO<string> {
  static create(value: string, minLength: number, attribute: string) {
    if (value.length < minLength) {
      throw new Error(`${attribute} must be at least 3 characters long`);
    }

    return new StringLengthVO(value);
  }
}
