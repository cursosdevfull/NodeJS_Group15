import { RoleRepository } from "../domain/repositories/role.repository";

export class RoleList {
  constructor(private readonly repo: RoleRepository) {}

  async execute() {
    return await this.repo.list();
  }
}
