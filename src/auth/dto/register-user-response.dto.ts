import { User } from "../../user/entities/user.entity"

export class RegisterUserResponseDto {
  name: string
  email: string
  message: string

  static fromUser(user: User): RegisterUserResponseDto {
    const dto = new RegisterUserResponseDto();
    dto.name = user.name
    dto.email = user.email
    dto.message = `User with email ${user.email} and username ${user.name} successfully created`
    return dto;
  }
}