import { Role, RoleEssentials } from "../../domain/role";
import { RoleEntity } from "../entities/role.entity";

export class RoleDto {
  static fromDataToDomain(data: RoleEntity | RoleEntity[]): Role | Role[] {
    if (Array.isArray(data))
      return data.map((role) => this.fromDataToDomain(role)) as Role[];

    const props: RoleEssentials = {
      id: data.id,
      name: data.name,
    };
    return new Role(props);
  }
}
