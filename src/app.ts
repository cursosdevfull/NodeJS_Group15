import express, { Application } from "express";

import roleRouter from "./modules/v1/role/infrastructure/routes";
import userRouter from "./modules/v1/user/infrastructure/presentation/routes";

class App {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.middlewares();
    this.mountRoutes();
  }

  private middlewares(): void {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: false }));
  }

  private mountRoutes(): void {
    this.expressApp.use("/v1/user", userRouter);
    this.expressApp.use("/v1/role", roleRouter);
  }
}

export default new App().expressApp;
