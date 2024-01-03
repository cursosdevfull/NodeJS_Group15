import { Router } from "express";

import { AuthenticationGuard } from "../../../../core/middlewares/authentication.guard";
import { AuthorizationGuard } from "../../../../core/middlewares/authorization.guard";
import { CacheMiddleware } from "../../../../core/middlewares/cache.middleware";
import { TeacherApplication } from "../../application/teacher.application";
import { TeacherRepository } from "../../repositories/teacher.repository";
import { TeacherInfrastructure } from "../teacher.infrastructure";
import { TeacherController } from "./controller";

class TeacherRoutes {
  router: Router;
  controller: TeacherController;

  constructor(controller: TeacherController) {
    this.router = Router();
    this.controller = controller;
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.router.post(
      "/",
      AuthenticationGuard.canActivate,
      AuthorizationGuard.canActivate("ADMIN"),
      this.controller.create.bind(controller)
    );
    this.router.get(
      "/",
      AuthenticationGuard.canActivate,
      AuthorizationGuard.canActivate("ADMIN", "OPERATOR"),
      CacheMiddleware.build("teacher_list"),
      this.controller.list.bind(controller)
    );
  }
}

const repository: TeacherRepository = new TeacherInfrastructure();
const application: TeacherApplication = new TeacherApplication(repository);
const controller: TeacherController = new TeacherController(application);

export default new TeacherRoutes(controller).router;
