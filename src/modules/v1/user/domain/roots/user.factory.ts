import { validate } from "uuid";

import { AgeVO } from "../value-objects/age.vo";
import { EmailVO } from "../value-objects/email.vo";
import { NumberValueVO } from "../value-objects/number-value.vo";
import { RequiredVO } from "../value-objects/required.vo";
import { RolesVO } from "../value-objects/roles.vo";
import { StringLengthVO } from "../value-objects/string-length.vo";
import { GENDER, User, UserProperties } from "./user";

export class UserFactory {
  static create(properties: UserProperties) {
    if (!validate(properties.id)) throw new Error("Invalid id");

    if (properties.gender && !(properties.gender in GENDER))
      throw new Error("Gender must be HOMBRE or MUJER");

    AgeVO.create(properties.age);
    RolesVO.create(properties.roles);
    EmailVO.create(properties.email);

    StringLengthVO.create(properties.name, 3, "Name");
    StringLengthVO.create(properties.lastname, 3, "Lastname");

    if (properties.address && properties.address?.city)
      StringLengthVO.create(properties.address.city, 3, "City");
    if (properties.address && properties.address?.country)
      StringLengthVO.create(properties.address.country, 3, "Country");
    if (properties.address && properties.address?.street)
      StringLengthVO.create(properties.address.street, 3, "Street");
    if (properties.address && properties.address)
      NumberValueVO.create(properties.address.number, 0, "Number");

    RequiredVO.create(properties.password, "Password");
    /*PatternVO.create(
      properties.password,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number"
    );*/

    if (properties.image) StringLengthVO.create(properties.image, 3, "Image");

    return new User(properties);
  }
}
