import { UserResult } from "../../../user/infrastructure/user.infrastructure";

export interface AuthRepository {
  getByEmail(email: string): Promise<UserResult>;
}
