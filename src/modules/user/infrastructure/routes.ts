import { Router } from 'express';

import { UserController } from './controller';

class UserRoutes {
  router: Router;
  controller: UserController;

  constructor(controller: UserController) {
    this.router = Router();
    this.controller = controller;
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.router.get("/", this.controller.list);

    this.router.post("/", (req, res) => {
      res.status(200).type("text/html").send(`
        <h1>Response from POST /user</h1>
                `);
    });
  }
}

const controller: UserController = new UserController();

export default new UserRoutes(controller).router;
