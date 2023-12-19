import { validate } from "uuid";

export interface RoleEssentials {
  id: string;
  name: string;
}

export type RoleProperties = RoleEssentials;

export class Role {
  private readonly id: string;
  private name: string;

  constructor(properties: RoleProperties) {
    if (properties.name.length < 3)
      throw new Error("Name must be at least 3 characters long");
    if (!validate(properties.id)) throw new Error("Invalid id");

    Object.assign(this, properties);
  }

  properties(): RoleProperties {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
