import { err, ok, Result } from "neverthrow";

import { DatabaseBootstrap } from "../../../../bootstrap/database.bootstrap";
import { Teacher } from "../domain/teacher";
import { TeacherRepository } from "../repositories/teacher.repository";
import { TeacherDto } from "./dtos/teacher.dto";
import { TeacherEntity } from "./entities/teacher.entity";

export type TeacherListResult = Result<Teacher | Teacher[], Error>;
export type TeacherCreateResult = Result<Teacher, Error>;

export class TeacherInfrastructure implements TeacherRepository {
  async list(): Promise<TeacherListResult> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(TeacherEntity);
      const teachers = await repository.find();

      return ok(TeacherDto.fromDataToDomain(teachers));
    } catch (error: any) {
      return err(new Error(error.message));
    }
  }
  async create(teacher: Teacher): Promise<TeacherCreateResult> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(TeacherEntity);

      const entity = TeacherDto.fromDomainToData(teacher);
      await repository.save(entity);

      return ok(teacher);
    } catch (error: any) {
      return err(new Error(error.message));
    }
  }
}
