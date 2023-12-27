import { err, ok, Result } from "neverthrow";

import { VO } from "../../../../core/domain/value-objects/vo";
import { IError } from "../../../../core/interface/error.interface";

export type NumberValueVOResult = Result<NumberValueVO, IError>;

export class NumberValueVO extends VO<number> {
  static create(
    value: number,
    min: number,
    attribute: string
  ): NumberValueVOResult {
    if (value < min) {
      const error: IError = new Error(
        `${attribute} must be greater than ${value}`
      );
      error.status = 411;
      return err(error);
    }

    return ok(new NumberValueVO(value));
  }
}
