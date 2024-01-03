import express, { Application, NextFunction, Request, Response } from "express";

import { RedisBootstrap } from "./bootstrap/redis.bootstrap";
import { IError } from "./modules/core/interface/error.interface";
import { AuthenticationGuard } from "./modules/core/middlewares/authentication.guard";
import { Parameters } from "./modules/core/parameters";
import authRouter from "./modules/v1/auth/infrastructure/presentation/routes";
import generateUrlUploadRouter from "./modules/v1/generate-url-upload/infrastructure/presentation/routes";
import roleRouter from "./modules/v1/role/infrastructure/presentation/routes";
import teacherRouter from "./modules/v1/teacher/infrastructure/presentation/routes";
import userRouter from "./modules/v1/user/infrastructure/presentation/routes";

class App {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.middlewares();
    this.mountRoutes();
    this.mountHelpers();
    this.mountErrorHandlers();
  }

  private middlewares(): void {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: false }));
  }

  private mountRoutes(): void {
    this.expressApp.use("/v1/user", userRouter);
    this.expressApp.use(
      "/v1/role",
      AuthenticationGuard.canActivate,
      roleRouter
    );
    this.expressApp.use("/v1/generate-url-upload", generateUrlUploadRouter);
    this.expressApp.use("/v1/auth", authRouter);
    this.expressApp.use("/v1/teacher", teacherRouter);
  }

  private mountHelpers(): void {
    this.expressApp.get("/invalidate-cache", (req, res) => {
      RedisBootstrap.clear();
      res.send("Cache cleared");
    });
  }

  private mountErrorHandlers() {
    this.expressApp.use((req, res, next) => {
      res.status(404).json({ message: "Not Found" });
    });

    this.expressApp.use(
      (err: IError, req: Request, res: Response, next: NextFunction) => {
        const objError: { message: string; stack?: string } = {
          message: err.message || "Internal Server Error",
        };

        if (Parameters.environment !== "production") {
          objError["stack"] = err.stack;
        }

        res.status(err.status || 500).json(objError);
      }
    );
  }
}

export default new App().expressApp;
