import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUpdateProfileRequestDto {
  @IsNotEmpty()
  @IsNumber()
  age: number

  @IsNotEmpty()
  @IsString()
  bio: string
}