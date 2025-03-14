import { IsNotEmpty, Length } from "class-validator";

export default class PasswordDto {
  @IsNotEmpty()
  @Length(4)
  password!: string;
}
