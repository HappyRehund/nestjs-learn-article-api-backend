import { User } from "../entities/user.entity"

export class LoginUserResponseDto {
  name: string
  email: string
  access_token: string
  message: string

  static fromUserAndToken(user: User , access_token: string): LoginUserResponseDto {
    const dto = new LoginUserResponseDto();

    dto.name = user.name
    dto.email = user.email
    dto.access_token = access_token
    dto.message = `user with name ${user.name} successfully logged in`

    return dto
  }
}