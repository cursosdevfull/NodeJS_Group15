import { Pagination } from "../../../core/interface/pagination";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/roots/user";
import db from "./db.json";
import { UserDto } from "./dtos/user.dto";
import { UserEntity } from "./entities/user.entity";

export class UserInfrastructure implements UserRepository {
  list(): Promise<User[]> {
    const users = db.users as UserEntity[];

    return Promise.resolve(UserDto.fromDataToDomain(users) as User[]);
  }
  get(id: string): Promise<User> {
    return Promise.resolve(new User(db.users[0]));
  }
  save(user: User): Promise<User> {
    const userEntity = UserDto.fromDomainToData(user) as UserEntity;
    return Promise.resolve(user);
  }

  getByPage(page: number, limit: number): Promise<Pagination<User>> {
    const users = UserDto.fromDataToDomain(
      db.users.splice(page * limit, limit) as UserEntity[]
    ) as User[];

    return Promise.resolve({
      total: db.users.length,
      page,
      data: users,
    });
  }
}
