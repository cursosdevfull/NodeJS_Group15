import { VO } from "./vo";

export class RolesVO extends VO<string[]> {
  static create(value: string[]) {
    if (!value || value.length === 0) {
      throw new Error("Roles must have at least one role");
    }

    return new RolesVO(value);
  }
}
