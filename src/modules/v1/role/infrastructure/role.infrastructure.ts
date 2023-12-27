import { err, ok, Result } from "neverthrow";

import { DatabaseBootstrap } from "../../../../bootstrap/database.bootstrap";
import { IError } from "../../../core/interface/error.interface";
import { RoleRepository } from "../domain/repositories/role.repository";
import { Role } from "../domain/role";
import { RoleDto } from "./dtos/role.dto";
import { RoleEntity } from "./entities/role.entity";

export type RoleResult = Result<Role[], IError>;

export class RoleInfrastructure implements RoleRepository {
  async list(): Promise<RoleResult> {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(RoleEntity);
    try {
      const roles = await repository.find();

      return ok(RoleDto.fromDataToDomain(roles) as Role[]);
    } catch (error: any) {
      const objError: IError = new Error(error.message || error.sqlMessage);
      objError.status = 500;
      return err(objError);
    }
  }
}
