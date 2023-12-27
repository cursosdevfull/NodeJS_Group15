import { err, ok, Result } from "neverthrow";

import { VO } from "../../../../core/domain/value-objects/vo";
import { IError } from "../../../../core/interface/error.interface";

export type RequiredVOResult = Result<RequiredVO, IError>;

export class RequiredVO extends VO<string> {
  static create(value: string, attribute: string): RequiredVOResult {
    if (value.trim().length === 0) {
      const error: IError = new Error(`${attribute} is required`);
      error.status = 411;
      return err(error);
    }

    return ok(new RequiredVO(value));
  }
}
