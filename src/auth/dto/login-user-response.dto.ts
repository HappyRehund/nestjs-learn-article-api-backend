import { User } from "../../user/entities/user.entity"
import { ValidateLocalStrategyResponseDto } from "./validate-local-strategy-response.dto"

export class LoginUserResponseDto {
  name: string
  email: string
  access_token: string
  refresh_token: string
  message: string

  static fromUserAndToken(user: User , access_token: string): LoginUserResponseDto {
    const dto = new LoginUserResponseDto();

    dto.name = user.name
    dto.email = user.email
    dto.access_token = access_token
    dto.message = `user with name ${user.name} successfully logged in`

    return dto
  }

  static fromValidateLocalStrategyAndTokens(
    user: ValidateLocalStrategyResponseDto,
    accessToken: string,
    refreshToken: string
  ): LoginUserResponseDto {
    const dto = new LoginUserResponseDto()

    dto.name = user.name
    dto.email = user.email
    dto.access_token = accessToken
    dto.refresh_token = refreshToken
    dto.message = `user with name ${user.name} successfully logged in`

    return dto

  }

  // NOT USED BECAUSE ALREADY IMPLEMENTING REFRESH TOKENS
  static fromValidateLocalStrategyAndToken(user: ValidateLocalStrategyResponseDto, access_token: string): LoginUserResponseDto {
    const dto = new LoginUserResponseDto();

    dto.name = user.name
    dto.email = user.email
    dto.access_token = access_token
    dto.message = `user with name ${user.name} successfully logged in`

    return dto
  }
}