import { err, ok, Result } from "neverthrow";
import { IsNull } from "typeorm";

import { DatabaseBootstrap } from "../../../../bootstrap/database.bootstrap";
import { IError } from "../../../core/interface/error.interface";
import { Pagination } from "../../../core/interface/pagination";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/roots/user";
import { UserDto } from "./dtos/user.dto";
import { UserEntity } from "./entities/user.entity";

export type UserResult = Result<User | User[] | Pagination<User>, IError>;

export class UserInfrastructure implements UserRepository {
  async list(): Promise<UserResult> {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(UserEntity);
    try {
      const users = await repository.find({ where: { deletedAt: IsNull() } });
      return ok(UserDto.fromDataToDomain(users) as User[]);
    } catch (error: any) {
      const objError: IError = new Error(error.message || error.sqlMessage);
      objError.status = 500;
      return err(objError);
    }
  }

  async get(id: string): Promise<UserResult> {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(UserEntity);
    try {
      const user = await repository.findOne({
        where: { id, deletedAt: IsNull() },
      });

      return ok(UserDto.fromDataToDomain(user) as User);
    } catch (error: any) {
      const objError: IError = new Error(error.message || error.sqlMessage);
      objError.status = 500;
      return err(objError);
    }
  }

  async getByEmail(email: string): Promise<UserResult> {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(UserEntity);
    try {
      const user = await repository.findOne({
        where: { email },
      });
      return ok(UserDto.fromDataToDomain(user) as User);
    } catch (error: any) {
      const objError: IError = new Error(error.message || error.sqlMessage);
      objError.status = 500;
      return err(objError);
    }
  }

  async save(user: User): Promise<UserResult> {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(UserEntity);

    try {
      const userEntity = UserDto.fromDomainToData(user) as UserEntity;
      await repository.save(userEntity);
      return ok(user);
    } catch (error: any) {
      const objError: IError = new Error(error.message || error.sqlMessage);
      objError.status = 500;
      return err(objError);
    }
  }

  async getByPage(page: number, limit: number): Promise<UserResult> {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(UserEntity);

    try {
      const [usersInPage, total] = await repository.findAndCount({
        skip: page * limit,
        take: limit,
        where: { deletedAt: IsNull() },
      });

      const users = UserDto.fromDataToDomain(usersInPage) as User[];

      return ok({
        total,
        page,
        data: users,
      });
    } catch (error: any) {
      const objError: IError = new Error(error.message || error.sqlMessage);
      objError.status = 500;
      return err(objError);
    }
  }
}
