import { User } from "../../user/entities/user.entity"
import { ValidateLocalStrategyResponseDto } from "./validate-local-strategy-response.dto"

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

  static fromValidateLocalStrategyAndToken(user: ValidateLocalStrategyResponseDto, access_token: string): LoginUserResponseDto {
    const dto = new LoginUserResponseDto();

    dto.name = user.name
    dto.email = user.email
    dto.access_token = access_token
    dto.message = `user with name ${user.name} successfully logged in`

    return dto
  }
}