import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/roots/user";
import { CryptService } from "./services/crypt.service";

export class UserCreate {
  constructor(
    private readonly repo: UserRepository,
    private readonly cryptService: CryptService
  ) {}

  async execute(user: User) {
    return await this.repo.save(user);
  }
}
