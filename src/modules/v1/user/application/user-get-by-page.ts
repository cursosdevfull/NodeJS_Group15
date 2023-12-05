import { UserRepository } from "../domain/repositories/user.repository";

export class UserGetByPage {
  constructor(private readonly repo: UserRepository) {}

  async execute(page: number, limit: number) {
    return await this.repo.getByPage(page, limit);
  }
}
