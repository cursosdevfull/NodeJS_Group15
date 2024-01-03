import { plainToInstance } from "class-transformer";

import { Teacher } from "../../domain/teacher";
import { TeacherEntity } from "../entities/teacher.entity";

export class TeacherDto {
  static fromDataToDomain(
    data: TeacherEntity | TeacherEntity[]
  ): Teacher | Teacher[] {
    if (Array.isArray(data)) {
      return data.map((item) => this.fromDataToDomain(item)) as Teacher[];
    }

    const { id, name, link, summary } = data;
    const result = Teacher.create(id, name, link, summary);
    if (result.isErr()) return;

    return result.value;
  }

  static fromDomainToData(domain: Teacher): TeacherEntity {
    //const {id, name, link, summary} = domain.properties;

    return plainToInstance(TeacherEntity, domain.properties);

    // const teacherEntity = new TeacherEntity();
    // teacherEntity.id = id;
    // teacherEntity.name = name;
    // teacherEntity.link = link;
    // teacherEntity.summary = summary;

    // return teacherEntity
  }
}
