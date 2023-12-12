import { VO } from "./vo";

export class PatternVO extends VO<string> {
  static create(value: string, pattern: RegExp, message: string) {
    if (!value.match(pattern)) {
      throw new Error(message);
    }

    return new PatternVO(value);
  }
}
