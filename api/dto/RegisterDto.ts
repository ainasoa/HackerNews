import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";

export default class RegisterDto {
  photo!: any;

  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsNumber()
  age!: number;

  @IsNotEmpty()
  @Length(4)
  password!: string;

  @IsOptional()
  @IsString()
  description!: string;

  @IsOptional()
  visibility: boolean = true;
}
