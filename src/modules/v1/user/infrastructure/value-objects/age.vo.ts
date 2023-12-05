import { VO } from "./vo";

export class AgeVO extends VO<number> {
  static create(value: number): VO<number> {
    if (value < 18) {
      throw new Error("User must be older than 18");
    }

    return new AgeVO(value);
  }
}
