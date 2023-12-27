import { err, ok, Result } from 'neverthrow';

import { VO } from '../../../../core/domain/value-objects/vo';
import { IError } from '../../../../core/interface/error.interface';
import { Role } from '../entities/role';

export type RolesVOResult = Result<RolesVO, IError>;

export class RolesVO extends VO<Role[]> {
  static create(value: Role[]): RolesVOResult {
    if (!value || value.length === 0) {
      const error: IError = new Error("Roles must have at least one role");
      error.status = 411;
      return err(error);
    }

    return ok(new RolesVO(value))
  }
}
