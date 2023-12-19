import { IsNull } from "typeorm";

import { DatabaseBootstrap } from "../../../../bootstrap/database.bootstrap";
import { Pagination } from "../../../core/interface/pagination";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/roots/user";
import { UserDto } from "./dtos/user.dto";
import { UserEntity } from "./entities/user.entity";

export class UserInfrastructure implements UserRepository {
  async list(): Promise<User[]> {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(UserEntity);
    const users = await repository.find({ where: { deletedAt: IsNull() } });

    return UserDto.fromDataToDomain(users) as User[];
  }

  async get(id: string): Promise<User> {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(UserEntity);
    const user = await repository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    return UserDto.fromDataToDomain(user) as User;
  }

  async getByEmail(email: string): Promise<User> {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(UserEntity);
    const user = await repository.findOne({
      where: { email },
    });

    return UserDto.fromDataToDomain(user) as User;
  }

  async save(user: User): Promise<User> {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(UserEntity);

    const userEntity = UserDto.fromDomainToData(user) as UserEntity;
    await repository.save(userEntity);
    return user;
  }

  async getByPage(page: number, limit: number): Promise<Pagination<User>> {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(UserEntity);

    const [usersInPage, total] = await repository.findAndCount({
      skip: page * limit,
      take: limit,
      where: { deletedAt: IsNull() },
    });

    const users = UserDto.fromDataToDomain(usersInPage) as User[];

    return {
      total,
      page,
      data: users,
    };
  }
}
