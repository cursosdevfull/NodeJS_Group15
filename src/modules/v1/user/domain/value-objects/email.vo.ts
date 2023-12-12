import { VO } from "./vo";

export class EmailVO extends VO<string> {
  static create(value: string) {
    if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      throw new Error("Invalid email");
    }

    return new EmailVO(value);
  }
}
