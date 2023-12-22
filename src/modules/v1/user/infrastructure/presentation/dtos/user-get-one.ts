import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UserGetOneValidator {
  @IsNotEmpty()
  @IsString()
  @IsUUID("4", { message: "The id must be a UUID version 4" })
  id: string;
}
