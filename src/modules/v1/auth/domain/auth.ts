import { err, ok, Result } from "neverthrow";

import { EmailVO } from "../../../core/domain/value-objects/email.vo";
import { IError } from "../../../core/interface/error.interface";

export type AuthResult = Result<Auth, IError>;

export class Auth {
  private readonly email: string;
  private readonly password: string;

  private constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  static create(email: string, password: string): AuthResult {
    const emailOrError = EmailVO.create(email);
    if (emailOrError.isErr()) {
      return err(emailOrError.error);
    }

    return ok(new Auth(email, password));
  }
}
