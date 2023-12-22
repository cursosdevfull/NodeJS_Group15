import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";

import { GENDER } from "../../../domain/roots/user";

export class Role {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;
}

export class Address {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  street: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  number: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  country: string;
}

export class UserCreateValidator {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  password: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Role)
  roles: Role[];

  @IsOptional()
  @IsNumber()
  @Min(18)
  @Type(() => Number)
  age: number;

  @IsOptional()
  @IsEnum(GENDER)
  gender: GENDER;

  @IsOptional()
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsOptional()
  image: string;
}
