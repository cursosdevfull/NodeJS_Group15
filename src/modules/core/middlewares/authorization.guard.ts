import { NextFunction, Request, Response } from "express";

import { IError } from "../interface/error.interface";

export class AuthorizationGuard {
  static canActivate(...rolesAllowed: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const userRoles = res.locals.roles;
      for (const role of rolesAllowed) {
        if (userRoles.includes(role)) {
          return next();
        }
      }

      const error: IError = new Error("Unauthorized");
      error.status = 401;
      return next(error);
    };
  }
  //   static canActivate(req: Request, res: Response, next: NextFunction) {
  //     const roles = res.locals.roles;

  //     if (roles.includes("ADMIN2")) {
  //       return next();
  //     }

  //     const error: IError = new Error("Unauthorized");
  //     error.status = 401;

  //     next(error);
  //   }
}
