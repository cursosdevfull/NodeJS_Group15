import { err, ok, Result } from "neverthrow";
import { validate } from "uuid";

import { EmailVO } from "../../../../core/domain/value-objects/email.vo";
import { IError } from "../../../../core/interface/error.interface";
import { AgeVO } from "../value-objects/age.vo";
import { NumberValueVO } from "../value-objects/number-value.vo";
import { RequiredVO } from "../value-objects/required.vo";
import { RolesVO } from "../value-objects/roles.vo";
import { StringLengthVO } from "../value-objects/string-length.vo";
import { GENDER, User, UserProperties } from "./user";

export type UserCreateResult = Result<User, IError>;

export class UserFactory {
  static create(properties: UserProperties): UserCreateResult {
    if (!validate(properties.id)) {
      const error: IError = new Error("Invalid id");
      error.status = 411;
      return err(error);
    }

    if (properties.gender && !(properties.gender in GENDER)) {
      const error: IError = new Error("Gender must be HOMBRE or MUJER");
      error.status = 411;
      return err(error);
    }

    const resultAge = AgeVO.create(properties.age);
    if (resultAge.isErr()) {
      return err(resultAge.error);
    }

    const resultRoles = RolesVO.create(properties.roles);
    if (resultRoles.isErr()) {
      return err(resultRoles.error);
    }

    const resultEmail = EmailVO.create(properties.email);
    if (resultEmail.isErr()) {
      return err(resultEmail.error);
    }

    const resultName = StringLengthVO.create(properties.name, 3, "Name");
    if (resultName.isErr()) {
      return err(resultName.error);
    }

    const resultLastname = StringLengthVO.create(
      properties.lastname,
      3,
      "Lastname"
    );
    if (resultLastname.isErr()) {
      return err(resultLastname.error);
    }

    if (properties.address && properties.address?.city) {
      const resultCity = StringLengthVO.create(
        properties.address.city,
        3,
        "City"
      );
      if (resultCity.isErr()) {
        return err(resultCity.error);
      }
    }

    if (properties.address && properties.address?.country) {
      const resultCountry = StringLengthVO.create(
        properties.address.country,
        3,
        "Country"
      );
      if (resultCountry.isErr()) {
        return err(resultCountry.error);
      }
    }

    if (properties.address && properties.address?.street) {
      const resultStreet = StringLengthVO.create(
        properties.address.street,
        3,
        "Street"
      );
      if (resultStreet.isErr()) {
        return err(resultStreet.error);
      }
    }
    if (properties.address && properties.address?.number) {
      const resultNumber = NumberValueVO.create(
        properties.address.number,
        0,
        "Number"
      );
      if (resultNumber.isErr()) {
        return err(resultNumber.error);
      }
    }

    const resultRequired = RequiredVO.create(properties.password, "Password");
    if (resultRequired.isErr()) {
      return err(resultRequired.error);
    }
    /*PatternVO.create(
      properties.password,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number"
    );*/

    if (properties.image) {
      const resultImage = StringLengthVO.create(properties.image, 3, "Image");
      if (resultImage.isErr()) {
        return err(resultImage.error);
      }
    }

    return ok(new User(properties));
  }
}
