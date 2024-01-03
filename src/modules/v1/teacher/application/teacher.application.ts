import { Teacher } from "../domain/teacher";
import { TeacherRepository } from "../repositories/teacher.repository";

export class TeacherApplication {
  constructor(private readonly repository: TeacherRepository) {}

  async list() {
    return await this.repository.list();
  }

  async create(teacher: Teacher) {
    return await this.repository.create(teacher);
  }
}
