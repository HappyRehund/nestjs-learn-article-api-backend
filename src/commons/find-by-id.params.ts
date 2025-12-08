import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class IdParams {
  @IsNotEmpty()
  @IsUUID()
  id: string
}