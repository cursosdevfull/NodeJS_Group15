import * as bcrypt from "bcryptjs";

export class CryptService {
  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, 10);
  }
}
