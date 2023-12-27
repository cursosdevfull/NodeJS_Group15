import { Router } from 'express';

import { CryptService } from '../../application/services/crypt.service';
import { UserCreate } from '../../application/user-create';
import { UserDelete } from '../../application/user-delete';
import { UserGetByPage } from '../../application/user-get-by-page';
import { UserGetOne } from '../../application/user-get-one';
import { UserList } from '../../application/user-list';
import { UserUpdate } from '../../application/user-update';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserInfrastructure } from '../user.infrastructure';
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
    this.router.post("/", this.controller.insert.bind(controller));
    this.router.get("/", this.controller.list.bind(controller));
    this.router.get("/page", this.controller.getByPage.bind(controller));
    this.router.get("/:id", this.controller.getOne.bind(controller));
    this.router.put("/:id", this.controller.update.bind(controller));
    this.router.delete("/:id", this.controller.delete.bind(controller));
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
