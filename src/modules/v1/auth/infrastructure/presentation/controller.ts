import { NextFunction, Request, Response } from "express";

import { IError } from "../../../../core/interface/error.interface";
import { AuthApplication } from "../../application/auth.application";

export class AuthController {
  constructor(private readonly application: AuthApplication) {}

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const result = await this.application.login(email, password);
    if (result.isErr()) {
      const error: IError = new Error(result.error.message);
      error.stack = result.error.stack;
      error.status = result.error.status;

      return next(error);
    }

    const tokens = result.value;
    res.json(tokens);
  }

  async newAccessToken(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.query;
    const result = await this.application.getNewAccessToken(
      refreshToken as string
    );
    if (result.isErr()) {
      const error: IError = new Error(result.error.message);
      error.stack = result.error.stack;
      error.status = result.error.status;

      return next(error);
    }

    const tokens = result.value;
    res.json(tokens);
  }
}
