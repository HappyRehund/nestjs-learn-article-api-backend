import { User } from "../entities/user.entity"

export class CreateUserResponseDto {
  name: string
  email: string
  message: string

  static fromEntity(entity: User): CreateUserResponseDto {
    const dto = new CreateUserResponseDto();
    dto.name = entity.name
    dto.email = entity.email
    dto.message = `User with email ${entity.email} and username ${entity.name} successfully created`
    return dto;
  }
}