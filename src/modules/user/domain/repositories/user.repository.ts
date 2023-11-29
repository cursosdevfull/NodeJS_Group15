import { User } from '../roots/user';

export interface UserRepository {
  list(): Promise<User[]>;
  get(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<User>;
}
