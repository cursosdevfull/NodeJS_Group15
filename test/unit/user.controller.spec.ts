import * as httpMock from "node-mocks-http";

import { RedisBootstrap } from "../../src/bootstrap/redis.bootstrap";
import { Role } from "../../src/modules/v1/role/domain/role";
import { CryptService } from "../../src/modules/v1/user/application/services/crypt.service";
import { UserCreate } from "../../src/modules/v1/user/application/user-create";
import { UserDelete } from "../../src/modules/v1/user/application/user-delete";
import { UserGetByPage } from "../../src/modules/v1/user/application/user-get-by-page";
import { UserGetOne } from "../../src/modules/v1/user/application/user-get-one";
import { UserList } from "../../src/modules/v1/user/application/user-list";
import { UserUpdate } from "../../src/modules/v1/user/application/user-update";
import { User } from "../../src/modules/v1/user/domain/roots/user";
import { UserController } from "../../src/modules/v1/user/infrastructure/presentation/controller";
import { UserDto } from "../../src/modules/v1/user/infrastructure/presentation/dtos/user.response";
import { UserInfrastructure } from "../../src/modules/v1/user/infrastructure/user.infrastructure";
import usersMock from "../mocks/user.mock.json";

const users = usersMock.map((user: any) => {
  user.roles = user.roles.map((role: any) => new Role(role)) as Role[];
  return new User(user);
});

const usersResponse = UserDto.fromDomainToResponse(users as User[]);
const userOneResponse = UserDto.fromDomainToResponse(users[0] as User);

let repository: any;
let cryptService: any;
let userCreate: any;
let userList: any;
let userGetOne: any;
let userUpdate: any;
let userDelete: any;
let userGetByPage: any;

let userController: any;

let request: any;
let response: any;
let next: any;
let execute: any;
let executeGetOne: any;
let executeError: any;

describe("user/controller", () => {
  beforeEach(() => {
    const mockRedisSet = jest.fn();
    RedisBootstrap.set = mockRedisSet;

    execute = jest.fn().mockResolvedValue({
      isErr: jest.fn().mockReturnValue(false),
      value: users,
    });

    executeGetOne = jest.fn().mockResolvedValue({
      isErr: jest.fn().mockReturnValue(false),
      value: users[0],
    });

    (CryptService as unknown as jest.Mock) = jest.fn();
    (UserInfrastructure as jest.Mock) = jest.fn();
    (UserCreate as jest.Mock) = jest.fn();
    (UserList as jest.Mock) = jest.fn().mockReturnValue({
      execute: execute,
    });
    (UserGetOne as jest.Mock) = jest.fn().mockReturnValue({
      execute: executeGetOne,
    });
    (UserUpdate as jest.Mock) = jest.fn();
    (UserDelete as jest.Mock) = jest.fn();
    (UserGetByPage as jest.Mock) = jest.fn();

    repository = new UserInfrastructure();
    cryptService = new CryptService();
    userCreate = new UserCreate(repository, cryptService);
    userList = new UserList(repository);
    userGetOne = new UserGetOne(repository);
    userUpdate = new UserUpdate(repository);
    userDelete = new UserDelete(repository);
    userGetByPage = new UserGetByPage(repository);

    userController = new UserController(
      userCreate,
      userList,
      userGetOne,
      userUpdate,
      userDelete,
      userGetByPage
    );

    request = httpMock.createRequest();
    response = httpMock.createResponse();
    next = jest.fn();
  });

  it("list ok", async () => {
    // Arrange

    // Act
    await userController.list(request, response, next);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData()).toEqual(usersResponse);
    expect(execute).toHaveBeenCalled();
    expect(execute).toHaveBeenCalledTimes(1);
  });

  it("list error", async () => {
    const executeError = jest.fn().mockResolvedValue({
      isErr: jest.fn().mockReturnValue(true),
      error: {
        message: "Error in database",
        stack: "Error in database",
        status: 500,
      },
    });
    (UserList as jest.Mock) = jest.fn().mockReturnValue({
      execute: executeError,
    });

    const responseList = jest.fn();

    UserDto.fromDomainToResponse = responseList;

    userList = new UserList(repository);
    userController = new UserController(
      userCreate,
      userList,
      userGetOne,
      userUpdate,
      userDelete,
      userGetByPage
    );

    // Act
    await userController.list(request, response, next);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(responseList).not.toHaveBeenCalled();
  });

  it("getOne", async () => {
    // Arrange
    request = httpMock.createRequest({
      params: {
        id: "b359b4cf-833c-4b88-b121-7545bf0b2de7",
      },
    });
    UserDto.fromDomainToResponse = jest.fn().mockReturnValue(userOneResponse);
    // Act
    await userController.getOne(request, response, next);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData()).toEqual(userOneResponse);
    expect(executeGetOne).toHaveBeenCalled();
    expect(executeGetOne).toHaveBeenCalledTimes(1);
  });
});
