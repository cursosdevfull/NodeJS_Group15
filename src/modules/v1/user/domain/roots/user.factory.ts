import { validate } from "uuid";

import { AgeVO } from "../../infrastructure/value-objects/age.vo";
import { EmailVO } from "../../infrastructure/value-objects/email.vo";
import { RolesVO } from "../../infrastructure/value-objects/roles.vo";
import { GENDER, User, UserProperties } from "./user";

export class UserFactory {
  static create(properties: UserProperties) {
    if (!validate(properties.id)) throw new Error("Invalid id");

    if (properties.gender && !(properties.gender in GENDER))
      throw new Error("Gender must be HOMBRE or MUJER");

    AgeVO.create(properties.age);
    RolesVO.create(properties.roles);
    EmailVO.create(properties.email);

    if (properties.name.length < 3)
      throw new Error("Name must be at least 3 characters long");

    if (properties.lastname.length < 3)
      throw new Error("Lastname must be at least 3 characters long");

    if (properties.address && properties.address?.city?.length < 3)
      throw new Error("City must be at least 3 characters long");
    if (properties.address && properties.address?.country?.length < 3)
      throw new Error("Country must be at least 3 characters long");
    if (properties.address && properties.address?.street?.length < 3)
      throw new Error("Street must be at least 3 characters long");
    if (properties.address && properties.address?.number <= 0)
      throw new Error("Number must be greater than 0");

    if (!properties.password) throw new Error("Password is required");

    if (
      !properties.password?.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      )
    )
      throw new Error(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number"
      );

    if (properties.image?.length < 3)
      throw new Error("Image must be at least 3 characters long");

    return new User(properties);
  }
}
