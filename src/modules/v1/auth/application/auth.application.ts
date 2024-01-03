import { err, ok, Result } from "neverthrow";

import { IError } from "../../../core/interface/error.interface";
import { CryptService } from "../../user/application/services/crypt.service";
import { User } from "../../user/domain/roots/user";
import { AuthRepository } from "../domain/repositories/auth.repository";
import { TokensService } from "./services/tokens.service";

export type TTokens = { accessToken: string; refreshToken: string };

export type AuthResult = Result<TTokens, IError>;

export class AuthApplication {
  constructor(private readonly repository: AuthRepository) {}

  async login(email: string, password: string): Promise<AuthResult> {
    const userResult = await this.repository.getByEmail(email);
    if (userResult.isErr()) {
      return err(userResult.error);
    }

    const user = userResult.value as User;
    if (!user) {
      const error: IError = new Error("User invalid");
      error.status = 404;
      return err(error);
    }

    const isPasswordValid = await CryptService.compare(
      password,
      user.properties().password
    );
    if (!isPasswordValid) {
      const error: IError = new Error("User invalid");
      error.status = 404;
      return err(error);
    }

    const { name, roles, image, refreshToken } = user.properties();
    const accessToken = TokensService.createAccessToken(
      name,
      image,
      roles.map((role) => role.name)
    );

    const tokens: TTokens = { accessToken, refreshToken };
    return ok(tokens);
  }

  async getNewAccessToken(refreshToken: string): Promise<AuthResult> {
    const userResult = await this.repository.getByRefreshToken(refreshToken);
    if (userResult.isErr()) {
      return err(userResult.error);
    }

    const user = userResult.value as User;
    if (!user) {
      const error: IError = new Error("User invalid");
      error.status = 404;
      return err(error);
    }

    const { name, roles, image } = user.properties();
    const accessToken = TokensService.createAccessToken(
      name,
      image,
      roles.map((role) => role.name)
    );

    const newRefreshToken = TokensService.createRefreshToken();
    user.update({ refreshToken: newRefreshToken });

    const userUpdatedResult = await this.repository.save(user);
    if (userUpdatedResult.isErr()) {
      return err(userUpdatedResult.error);
    }

    const tokens: TTokens = { accessToken, refreshToken: newRefreshToken };
    return ok(tokens);
  }
}
