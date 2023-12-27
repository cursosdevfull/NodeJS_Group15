import { err, ok, Result } from "neverthrow";

import { VO } from "../../../../core/domain/value-objects/vo";
import { IError } from "../../../../core/interface/error.interface";

export type AgeVOResult = Result<AgeVO, IError>;

export class AgeVO extends VO<number> {
  static create(value: number): AgeVOResult {
    if (value < 18) {
      const error: IError = new Error("User must be older than 18");
      error.status = 411;
      return err(error);
    }

    return ok(new AgeVO(value));
  }
}
