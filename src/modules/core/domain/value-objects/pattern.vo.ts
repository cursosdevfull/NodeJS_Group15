import { err, ok, Result } from "neverthrow";

import { IError } from "../../interface/error.interface";
import { VO } from "./vo";

export type PatternVOResult = Result<PatternVO, IError>;

export class PatternVO extends VO<string> {
  static create(
    value: string,
    pattern: RegExp,
    message: string
  ): PatternVOResult {
    if (!value.match(pattern)) {
      const error: IError = new Error(message);
      error.status = 411;
      return err(error);
    }

    return ok(new PatternVO(value));
  }
}
