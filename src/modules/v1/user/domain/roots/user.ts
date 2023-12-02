import { v4 as uuidv4 } from "uuid";

import { Address } from "../entities/address";

export enum GENDER {
  HOMBRE = "HOMBRE",
  MUJER = "MUJER",
}

export interface UserEssentials {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: string[];
}

export interface UserOptionals {
  age: number;
  gender: GENDER;
  address: Address;
  image: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export type UserProperties = UserEssentials & Partial<UserOptionals>;

export type UserUpdateProperties = Partial<
  Omit<UserEssentials, "id" | "email"> &
    Pick<UserOptionals, "age" | "gender" | "address" | "image" | "refreshToken">
>;

export class User {
  private readonly id: string;
  private name: string;
  private lastname: string;
  private readonly email: string;
  private password: string;
  private roles: string[];
  private gender: GENDER;
  private address: Address;
  private age: number;
  private image: string;
  private refreshToken: string;
  private readonly createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  constructor(properties: UserProperties) {
    Object.assign(this, properties);
    this.createdAt = new Date();
    this.refreshToken = uuidv4();
  }

  properties(): UserProperties {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      roles: this.roles,
      gender: this.gender,
      address: this.address,
      age: this.age,
      image: this.image,
      refreshToken: this.refreshToken,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(fields: UserUpdateProperties) {
    Object.assign(this, fields);
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}
