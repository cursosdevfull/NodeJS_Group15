import { err, ok, Result } from "neverthrow";

import { VO } from "../../../../core/domain/value-objects/vo";
import { IError } from "../../../../core/interface/error.interface";

export type StringLengthVOResult = Result<StringLengthVO, IError>;

export class StringLengthVO extends VO<string> {
  static create(
    value: string,
    minLength: number,
    attribute: string
  ): StringLengthVOResult {
    if (value.length < minLength) {
      const error: IError = new Error(
        `${attribute} must be at least 3 characters long`
      );
      error.status = 411;
      return err(error);
    }

    return ok(new StringLengthVO(value));
  }
}
