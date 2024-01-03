import { addSeconds } from "date-fns";
import * as jwt from "jwt-simple";
import { v4 as uuidv4 } from "uuid";

import { Parameters } from "../../../../core/parameters";

export class TokensService {
  static createAccessToken(name: string, image: string, roles: string[]) {
    const secret = Parameters.token_keyword_secret;
    const currentDate = new Date();
    const expiresIn = addSeconds(currentDate, Parameters.token_expires_in);

    const payload = {
      name,
      image,
      roles,
      iat: currentDate.getTime(),
      exp: expiresIn.getTime(),
    };

    return jwt.encode(payload, secret);
  }

  static createRefreshToken() {
    return uuidv4();
  }

  static validateAccessToken(token: string) {
    return new Promise((resolve, reject) => {
      try {
        const secret = Parameters.token_keyword_secret;
        const payload = jwt.decode(token, secret);

        if (payload.exp <= new Date().getTime()) {
          reject({
            status: 409,
            message: "Token expired",
          });
        }

        resolve(payload);
      } catch (error) {
        reject({
          status: 401,
          message: "Invalid token",
        });
      }
    });
  }
}
