import { Address } from '../entities/address';

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
    if (!properties.age && properties.age < 18) {
      throw new Error("User must be older than 18");
    }
    if (properties.roles.length === 0)
      throw new Error("User must have at least one role");
    if (!properties.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
      throw new Error("Invalid email");

    if (properties.name.length < 3)
      throw new Error("Name must be at least 3 characters long");
    if (properties.lastname.length < 3)
      throw new Error("Lastname must be at least 3 characters long");

    Object.assign(this, properties);
    this.createdAt = new Date();
  }
}
