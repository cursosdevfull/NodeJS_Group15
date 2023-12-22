import { Router } from "express";

import { RoleList } from "../../application/role-list";
import { RoleRepository } from "../../domain/repositories/role.repository";
import { RoleInfrastructure } from "../role.infrastructure";
import { RoleController } from "./controller";

class UserRoutes {
  router: Router;
  controller: RoleController;

  constructor(controller: RoleController) {
    this.router = Router();
    this.controller = controller;
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.router.get("/", (req, res) => this.controller.list(req, res));
  }
}

const repository: RoleRepository = new RoleInfrastructure();
const roleList: RoleList = new RoleList(repository);
const controller: RoleController = new RoleController(roleList);

export default new UserRoutes(controller).router;
