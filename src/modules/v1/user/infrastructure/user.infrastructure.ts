import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/roots/user";
import db from "./db.json";

export class UserInfrastructure implements UserRepository {
  list(): Promise<User[]> {
    return Promise.resolve(db.users.map((user: any) => new User(user)));
  }
  get(id: string): Promise<User> {
    return Promise.resolve(new User(db.users[0]));
  }
  save(user: User): Promise<User> {
    return Promise.resolve(user);
  }
}
