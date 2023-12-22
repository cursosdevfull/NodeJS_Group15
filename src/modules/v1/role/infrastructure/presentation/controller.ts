import { Request, Response } from "express";

import { RoleList } from "../../application/role-list";

export class RoleController {
  constructor(private readonly roleList: RoleList) {}

  async list(req: Request, res: Response) {
    const roles = await this.roleList.execute();
    res.json(roles);
  }
}
