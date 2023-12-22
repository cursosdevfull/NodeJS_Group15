import { plainToInstance } from "class-transformer";

import { Address } from "../../domain/entities/address";
import { Role } from "../../domain/entities/role";
import { GENDER, User, UserProperties } from "../../domain/roots/user";
import { UserFactory } from "../../domain/roots/user.factory";
import { UserEntity } from "../entities/user.entity";

export class UserDto {
  static fromDataToDomain(data: UserEntity | UserEntity[]): User | User[] {
    if (Array.isArray(data)) {
      return data.map((user) => this.fromDataToDomain(user)) as User[];
    }

    const address = new Address();
    address.street = data.address?.street;
    address.number = data.address?.number;
    address.city = data.address?.city;
    address.country = data.address?.country;

    const props: UserProperties = {
      id: data.id,
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      roles: data.roles.map((role) => new Role(role.id, role.name)),
      gender: GENDER[data.gender as keyof typeof GENDER],
      address: data.address,
      age: data.age,
      image: data.image,
      refreshToken: data.refreshToken,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    };

    return UserFactory.create(props);
  }

  static fromDomainToData(data: User | User[]): UserEntity | UserEntity[] {
    if (Array.isArray(data)) {
      return data.map((user) => this.fromDomainToData(user)) as UserEntity[];
    }

    const props = data.properties();

    const userEntity = plainToInstance(UserEntity, props);

    // const userEntity = new UserEntity();
    // userEntity.id = props.id;
    // userEntity.name = props.name;
    // userEntity.lastname = props.lastname;
    // userEntity.email = props.email;
    // userEntity.password = props.password;
    // userEntity.gender = props.gender;
    // userEntity.address = props.address;
    // userEntity.age = props.age;
    // userEntity.image = props.image;
    // userEntity.refreshToken = props.refreshToken;
    // userEntity.createdAt = props.createdAt;
    // userEntity.updatedAt = props.updatedAt;
    // userEntity.deletedAt = props.deletedAt;

    return userEntity;
  }
}
