import { Router } from 'express';

class RoleRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.router.get("/", (req, res) => {
      res.status(200).type("text/html").send(`
            <h1>Role</h1>
        `);
    });
  }
}

export default new RoleRoutes().router;
