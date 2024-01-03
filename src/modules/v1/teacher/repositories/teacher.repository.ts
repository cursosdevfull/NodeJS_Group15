import { Teacher } from "../domain/teacher";
import { TeacherListResult } from "../infrastructure/teacher.infrastructure";

export interface TeacherRepository {
  list(): Promise<TeacherListResult>;
  create(teacher: Teacher): Promise<any>;
}
