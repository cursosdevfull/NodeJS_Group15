import { Request, Response } from "express";

import { UserCreate } from "../../application/user-create";
import { UserDelete } from "../../application/user-delete";
import { UserGetByPage } from "../../application/user-get-by-page";
import { UserGetOne } from "../../application/user-get-one";
import { UserList } from "../../application/user-list";
import { UserUpdate } from "../../application/user-update";
import { UserFactory } from "../../domain/roots/user.factory";
import { UserDto } from "./dtos/user.response";

export class UserController {
  constructor(
    private readonly userCreate: UserCreate,
    private readonly userList: UserList,
    private readonly userGetOne: UserGetOne,
    private readonly userUpdate: UserUpdate,
    private readonly userDelete: UserDelete,
    private readonly userGetByPage: UserGetByPage
  ) {}

  async list(req: Request, res: Response) {
    const users = await this.userList.execute();
    res.json(UserDto.fromDomainToResponse(users));
  }

  async insert(req: Request, res: Response) {
    const body = req.body;

    const user = UserFactory.create(body);

    const userInserted = await this.userCreate.execute(user);

    res.json(UserDto.fromDomainToResponse(userInserted));
  }

  async getOne(req: Request, res: Response) {
    const id = req.params.id;

    const user = await this.userGetOne.execute(id);

    res.json(UserDto.fromDomainToResponse(user));
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const body = req.body;

    const user = await this.userGetOne.execute(id);
    user.update(body);

    const userUpdated = await this.userUpdate.execute(user);

    res.json(UserDto.fromDomainToResponse(userUpdated));
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    const user = await this.userGetOne.execute(id);
    user.delete();

    const userDeleted = await this.userDelete.execute(user);

    res.json(UserDto.fromDomainToResponse(userDeleted));
  }

  async getByPage(req: Request, res: Response) {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);

    const pagination = await this.userGetByPage.execute(page, limit);

    res.json(UserDto.fromDomainToResponsePagination(pagination));
  }
}
