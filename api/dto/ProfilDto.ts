import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";

export default class ProfilDto {
  photo!: any;

  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  visibility!: boolean;

  @IsNotEmpty()
  @IsNumber()
  age!: number;

  @IsOptional()
  @IsString()
  description!: string;
}
