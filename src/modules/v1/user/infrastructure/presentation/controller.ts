import { NextFunction, Request, Response } from "express";

import { RedisBootstrap } from "../../../../../bootstrap/redis.bootstrap";
import { IError } from "../../../../core/interface/error.interface";
import { Pagination } from "../../../../core/interface/pagination";
import { Parameters } from "../../../../core/parameters";
import { validateData } from "../../../../core/presentation/get-errors";
import { CryptService } from "../../application/services/crypt.service";
import { UserCreate } from "../../application/user-create";
import { UserDelete } from "../../application/user-delete";
import { UserGetByPage } from "../../application/user-get-by-page";
import { UserGetOne } from "../../application/user-get-one";
import { UserList } from "../../application/user-list";
import { UserUpdate } from "../../application/user-update";
import { User, UserProperties } from "../../domain/roots/user";
import { UserFactory } from "../../domain/roots/user.factory";
import {
  Address,
  Role,
  UserCreateValidator,
} from "./dtos/user-create.validator";
import { UserGetOneValidator } from "./dtos/user-get-one";
import { UserDto } from "./dtos/user.response";

export class UserController {
  constructor(
    private readonly userCreate: UserCreate,
    private readonly userList: UserList,
    private readonly userGetOne: UserGetOne,
    private readonly userUpdate: UserUpdate,
    private readonly userDelete: UserDelete,
    private readonly userGetByPage: UserGetByPage
  ) {
    this.insert = this.insert.bind(this);
  }

  async list(req: Request, res: Response, next: NextFunction) {
    const result = await this.userList.execute();
    console.log("result", result.isErr());
    if (result.isErr()) {
      const error: IError = new Error(result.error.message);
      error.stack = result.error.stack;
      error.status = result.error.status;

      return next(error);
    }

    const users = result.value;
    const usersResponse = UserDto.fromDomainToResponse(users as User[]);

    await RedisBootstrap.set(
      res.locals.cacheKey,
      JSON.stringify(usersResponse)
    );

    res.json(usersResponse);
  }

  async insert(req: Request, res: Response, next: NextFunction) {
    const body: UserProperties = req.body;
    const validator = new UserCreateValidator();
    validator.id = body.id;
    validator.name = body.name;
    validator.lastname = body.lastname;
    validator.email = body.email;
    validator.password = body.password;
    validator.roles = body.roles.map((role) => Object.assign(new Role(), role));
    validator.age = body.age;
    validator.gender = body.gender;
    validator.address = Object.assign(new Address(), body.address);
    validator.image = body.image;

    const isError = await validateData(
      validator,
      {
        whitelist: true,
      },
      res
    );
    if (!isError) return;

    body.password = await CryptService.hash(body.password);
    if (body.image) body.image = `${Parameters.path_images}/${body.image}`;

    const resultUser = UserFactory.create(body);
    if (resultUser.isErr()) {
      const error: IError = new Error(resultUser.error.message);
      error.stack = resultUser.error.stack;
      error.status = resultUser.error.status;

      return next(error);
    }

    const user = resultUser.value as User;

    const result = await this.userCreate.execute(user);
    if (result.isErr()) {
      const error: IError = new Error(result.error.message);
      error.stack = result.error.stack;
      error.status = result.error.status;

      return next(error);
    }

    RedisBootstrap.clear("user");

    const userInserted = result.value as User;

    res.json(UserDto.fromDomainToResponse(userInserted));
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const validator = new UserGetOneValidator();
    validator.id = id;

    const isError = await validateData(
      validator,
      {
        whitelist: true,
      },
      res
    );
    if (!isError) return;

    const result = await this.userGetOne.execute(id);
    if (result.isErr()) {
      const error: IError = new Error(result.error.message);
      error.stack = result.error.stack;
      error.status = result.error.status;

      return next(error);
    }

    const user = result.value as User;
    const userResponse = UserDto.fromDomainToResponse(user);

    await RedisBootstrap.set(res.locals.cacheKey, JSON.stringify(userResponse));

    res.json(userResponse);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const body = req.body;

    const result = await this.userGetOne.execute(id);
    if (result.isErr()) {
      const error: IError = new Error(result.error.message);
      error.stack = result.error.stack;
      error.status = result.error.status;

      return next(error);
    }
    const user = result.value as User;
    user.update(body);

    const resultUpdated = await this.userUpdate.execute(user);
    if (resultUpdated.isErr()) {
      return res.status(resultUpdated.error.status).json({
        message: resultUpdated.error.message,
        stack: resultUpdated.error.stack,
      });
    }

    const userUpdated = resultUpdated.value as User;
    await RedisBootstrap.clear("user");

    res.json(UserDto.fromDomainToResponse(userUpdated));
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const result = await this.userGetOne.execute(id);
    if (result.isErr()) {
      const error: IError = new Error(result.error.message);
      error.stack = result.error.stack;
      error.status = result.error.status;

      return next(error);
    }

    const user = result.value as User;
    user.delete();

    const resultDelete = await this.userDelete.execute(user);
    if (resultDelete.isErr()) {
      const error: IError = new Error(resultDelete.error.message);
      error.stack = resultDelete.error.stack;
      error.status = resultDelete.error.status;

      return next(error);
    }

    const userDeleted = resultDelete.value as User;

    await RedisBootstrap.clear("user");

    res.json(UserDto.fromDomainToResponse(userDeleted));
  }

  async getByPage(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);

    const result = await this.userGetByPage.execute(page, limit);
    if (result.isErr()) {
      const error: IError = new Error(result.error.message);
      error.stack = result.error.stack;
      error.status = result.error.status;

      return next(error);
    }

    const pagination = result.value as Pagination<User>;
    const userResponse = UserDto.fromDomainToResponsePagination(pagination);

    await RedisBootstrap.set(res.locals.cacheKey, JSON.stringify(userResponse));

    res.json(userResponse);
  }
}
