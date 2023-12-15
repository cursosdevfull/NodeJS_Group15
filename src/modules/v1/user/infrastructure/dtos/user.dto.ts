import { Address } from "../../domain/entities/address";
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
      //roles: data.roles,
      gender: GENDER[data.gender as keyof typeof GENDER],
      address,
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

    return {
      id: props.id,
      name: props.name,
      lastname: props.lastname,
      email: props.email,
      password: props.password,
      //roles: props.roles,
      gender: props.gender,
      address: {
        street: props.address?.street,
        number: props.address?.number,
        city: props.address?.city,
        country: props.address?.country,
      },
      age: props.age,
      image: props.image,
      refreshToken: props.refreshToken,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    };
  }
}
