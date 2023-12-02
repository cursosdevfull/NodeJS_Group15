import { Request, Response } from "express";

import { UserCreate } from "../application/user-create";
import { UserDelete } from "../application/user-delete";
import { UserGetOne } from "../application/user-get-one";
import { UserList } from "../application/user-list";
import { UserUpdate } from "../application/user-update";
import { UserFactory } from "../domain/roots/user.factory";

export class UserController {
  constructor(
    private readonly userCreate: UserCreate,
    private readonly userList: UserList,
    private readonly userGetOne: UserGetOne,
    private readonly userUpdate: UserUpdate,
    private readonly userDelete: UserDelete
  ) {}

  async list(req: Request, res: Response) {
    const users = await this.userList.execute();
    res.json(users);
  }

  async insert(req: Request, res: Response) {
    const body = req.body;

    const user = UserFactory.create(body);

    const userInserted = await this.userCreate.execute(user);

    res.json(userInserted);
  }

  async getOne(req: Request, res: Response) {
    const id = req.params.id;

    const user = await this.userGetOne.execute(id);

    res.json(user);
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const body = req.body;

    const user = await this.userGetOne.execute(id);
    user.update(body);

    const userUpdated = await this.userUpdate.execute(user);

    res.json(userUpdated);
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    const user = await this.userGetOne.execute(id);
    user.delete();

    const userDeleted = await this.userDelete.execute(user);

    res.json(userDeleted);
  }
}
