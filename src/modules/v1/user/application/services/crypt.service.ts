import * as bcrypt from "bcryptjs";

export class CryptService {
  static async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, 10);
  }
}
