import { User } from "../entities/user.entity"

export class CreateUserResponseDto {
  name: string
  email: string
  message: string

  static fromUser(user: User): CreateUserResponseDto {
    const dto = new CreateUserResponseDto();
    dto.name = user.name
    dto.email = user.email
    dto.message = `User with email ${user.email} and username ${user.name} successfully created`
    return dto;
  }
}