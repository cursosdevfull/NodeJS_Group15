import { User } from "../../../user/domain/roots/user";
import { UserResult } from "../../../user/infrastructure/user.infrastructure";

export interface AuthRepository {
  getByEmail(email: string): Promise<UserResult>;
  getByRefreshToken(refreshToken: string): Promise<UserResult>;
  save(user: User): Promise<UserResult>;
}
