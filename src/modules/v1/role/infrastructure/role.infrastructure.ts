import { DatabaseBootstrap } from "../../../../bootstrap/database.bootstrap";
import { RoleRepository } from "../domain/repositories/role.repository";
import { Role } from "../domain/role";
import { RoleDto } from "./dtos/role.dto";
import { RoleEntity } from "./entities/role.entity";

export class RoleInfrastructure implements RoleRepository {
  async list(): Promise<Role[]> {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(RoleEntity);
    const roles = await repository.find();

    return RoleDto.fromDataToDomain(roles) as Role[];
  }
}
