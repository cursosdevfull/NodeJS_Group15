import { UserRepository } from "../domain/repositories/user.repository";

export class UserList {
  constructor(private readonly repo: UserRepository) {}

  async execute() {
    return await this.repo.list();
  }
}
