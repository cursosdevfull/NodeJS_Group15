import { Router } from 'express';

import { UserInfrastructure } from '../../../user/infrastructure/user.infrastructure';
import { AuthApplication } from '../../application/auth.application';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthController } from './controller';

class AuthRoutes {
  router: Router;
  controller: AuthController;

  constructor(controller: AuthController) {
    this.router = Router();
    this.controller = controller;
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.router.post("/login", this.controller.login.bind(controller));
  }
}

const repository: AuthRepository = new UserInfrastructure();
const authApplication: AuthApplication = new AuthApplication(repository);
const controller: AuthController = new AuthController(authApplication);

export default new AuthRoutes(controller).router;
