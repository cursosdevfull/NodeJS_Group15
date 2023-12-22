import express, { Application, NextFunction, Request, Response } from "express";

import { IError } from "./modules/core/interface/error.interface";
import { Parameters } from "./modules/core/parameters";
import generateUrlUploadRouter from "./modules/v1/generate-url-upload/infrastructure/presentation/routes";
import roleRouter from "./modules/v1/role/infrastructure/presentation/routes";
import userRouter from "./modules/v1/user/infrastructure/presentation/routes";

class App {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.middlewares();
    this.mountRoutes();
    this.mountErrorHandlers();
  }

  private middlewares(): void {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: false }));
  }

  private mountRoutes(): void {
    this.expressApp.use("/v1/user", userRouter);
    this.expressApp.use("/v1/role", roleRouter);
    this.expressApp.use("/v1/generate-url-upload", generateUrlUploadRouter);
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
