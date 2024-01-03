import { NextFunction, Request, Response } from "express";

import { TokensService } from "../../v1/auth/application/services/tokens.service";
import { IError } from "../interface/error.interface";

export class AuthenticationGuard {
  static async canActivate(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    const { authorization } = headers;

    if (!authorization) {
      const error: IError = new Error("Unauthorized");
      error.status = 401;

      return next(error);
    }

    const partsAuthorization = authorization?.split(" ");

    if (partsAuthorization?.length !== 2) {
      const error: IError = new Error("Unauthorized");
      error.status = 401;

      return next(error);
    }

    const [type, value] = partsAuthorization;

    if (type !== "Bearer") {
      const error: IError = new Error("Unauthorized");
      error.status = 401;

      return next(error);
    }

    try {
      const payload: any = await TokensService.validateAccessToken(value);
      res.locals.roles = payload.roles;
      next();
    } catch (error) {
      next(error);
    }
  }
}
