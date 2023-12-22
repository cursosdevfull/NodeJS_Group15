import { Role } from "../entities/role";
import { VO } from "./vo";

export class RolesVO extends VO<Role[]> {
  static create(value: Role[]) {
    if (!value || value.length === 0) {
      throw new Error("Roles must have at least one role");
    }

    return new RolesVO(value);
  }
}
