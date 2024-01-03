import { Request, Response } from "express";

import { RedisBootstrap } from "../../../../../bootstrap/redis.bootstrap";
import { validateData } from "../../../../core/presentation/get-errors";
import { TeacherApplication } from "../../application/teacher.application";
import { Teacher } from "../../domain/teacher";
import { TeacherCreateDto } from "./dtos/teacher-create.dto";

export class TeacherController {
  constructor(private readonly application: TeacherApplication) {}

  async list(req: Request, res: Response) {
    const teachersResult = await this.application.list();
    if (teachersResult.isErr())
      return res.status(400).json(teachersResult.error.message);

    await RedisBootstrap.set(
      res.locals.cacheKey,
      JSON.stringify(teachersResult.value)
    );

    return res.status(200).json(teachersResult.value);
  }

  async create(req: Request, res: Response) {
    const { id, name, link, summary } = req.body;

    const teacherCreateDto = new TeacherCreateDto();
    teacherCreateDto.id = id;
    teacherCreateDto.name = name;
    teacherCreateDto.link = link;
    teacherCreateDto.summary = summary;

    const isError = await validateData(
      teacherCreateDto,
      {
        whitelist: true,
      },
      res
    );
    if (!isError) return;

    const teacherResult = Teacher.create(id, name, link, summary);
    if (teacherResult.isErr())
      return res.status(400).json(teacherResult.error.message);

    const teacher = teacherResult.value;

    const teacherCreateResult = await this.application.create(teacher);

    if (teacherCreateResult.isErr())
      return res.status(400).json(teacherCreateResult.error.message);

    await RedisBootstrap.clear("teacher_list");

    return res.status(201).json(teacherCreateResult.value);
  }
}
