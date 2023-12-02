import { UserRepository } from "../domain/repositories/user.repository";

export class UserGetOne {
  constructor(private readonly repo: UserRepository) {}

  async execute(id: string) {
    return await this.repo.get(id);
  }
}
