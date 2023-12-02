import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/roots/user";

export class UserDelete {
  constructor(private readonly repo: UserRepository) {}

  async execute(user: User) {
    return await this.repo.save(user);
  }
}
