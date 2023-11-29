import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/roots/user';

export class UserInfrastructure implements UserRepository {
  list(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  get(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  save(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
