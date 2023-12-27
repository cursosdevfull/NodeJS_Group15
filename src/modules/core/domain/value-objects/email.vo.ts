import { err, ok, Result } from "neverthrow";

import { IError } from "../../interface/error.interface";
import { VO } from "./vo";

export type EmailVOResult = Result<EmailVO, IError>;

export class EmailVO extends VO<string> {
  static create(value: string): EmailVOResult {
    if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      const error: IError = new Error("Invalid email");
      error.status = 411;
      return err(error);
    }

    return ok(new EmailVO(value));
  }
}
