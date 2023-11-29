import express, { Application } from 'express';

import roleRouter from './modules/role/infrastructure/routes';
import userRouter from './modules/user/infrastructure/routes';

class App {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.expressApp.use("/user", userRouter);
    this.expressApp.use("/role", roleRouter);
  }
}

export default new App().expressApp;
