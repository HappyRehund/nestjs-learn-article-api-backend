import { IsEmail, IsNotEmpty, IsString } from "class-validator";

// NOT USED
export class LoginUserRequestDto {

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}