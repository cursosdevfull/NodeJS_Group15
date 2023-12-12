import { VO } from "./vo";

export class RequiredVO extends VO<string> {
  static create(value: string, attribute: string) {
    if (value.trim().length === 0) {
      throw new Error(`${attribute} is required`);
    }

    return new RequiredVO(value);
  }
}
