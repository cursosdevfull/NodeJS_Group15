import { Router } from "express";

import { CryptService } from "../../application/services/crypt.service";
import { UserCreate } from "../../application/user-create";
import { UserDelete } from "../../application/user-delete";
import { UserGetByPage } from "../../application/user-get-by-page";
import { UserGetOne } from "../../application/user-get-one";
import { UserList } from "../../application/user-list";
import { UserUpdate } from "../../application/user-update";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserInfrastructure } from "../user.infrastructure";
import { UserController } from "./controller";

class UserRoutes {
  router: Router;
  controller: UserController;

  constructor(controller: UserController) {
    this.router = Router();
    this.controller = controller;
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.router.post("/", (req, res) => this.controller.insert(req, res));
    this.router.get("/", (req, res) => this.controller.list(req, res));
    this.router.get("/page", (req, res) => this.controller.getByPage(req, res));
    this.router.get("/:id", (req, res) => this.controller.getOne(req, res));
    this.router.put("/:id", (req, res) => this.controller.update(req, res));
    this.router.delete("/:id", (req, res) => this.controller.delete(req, res));
  }
}

const repository: UserRepository = new UserInfrastructure();
const cryptService: CryptService = new CryptService();
const userCreate: UserCreate = new UserCreate(repository, cryptService);
const userList: UserList = new UserList(repository);
const userGetOne: UserGetOne = new UserGetOne(repository);
const userUpdate: UserUpdate = new UserUpdate(repository);
const userDelete: UserDelete = new UserDelete(repository);
const userGetByPage: UserGetByPage = new UserGetByPage(repository);
const controller: UserController = new UserController(
  userCreate,
  userList,
  userGetOne,
  userUpdate,
  userDelete,
  userGetByPage
);

export default new UserRoutes(controller).router;
