import { addSeconds } from "date-fns";
import * as jwt from "jsonwebtoken";

import { Parameters } from "../../../../core/parameters";

export class TokensService {
  static createAccessToken(name: string, image: string, roles: string[]) {
    const secret = Parameters.token_keyword_secret;
    const currentDate = new Date();
    const expiresIn = addSeconds(currentDate, Parameters.token_expires_in);

    return jwt.sign(
      {
        name,
        image,
        roles,
        iat: currentDate.getTime(),
        exp: expiresIn.getTime(),
      },
      secret
    );
  }
}
