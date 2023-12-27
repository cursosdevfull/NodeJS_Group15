import { NextFunction, Request, Response } from "express";

import { IError } from "../../../../core/interface/error.interface";
import { RoleList } from "../../application/role-list";
import { Role } from "../../domain/role";

export class RoleController {
  constructor(private readonly roleList: RoleList) {}

  async list(req: Request, res: Response, next: NextFunction) {
    const result = await this.roleList.execute();
    if (result.isErr()) {
      const error: IError = new Error(result.error.message);
      error.stack = result.error.stack;
      error.status = result.error.status;

      return next(error);
    }

    const roles = result.value as Role[];
    res.json(roles);
  }
}
