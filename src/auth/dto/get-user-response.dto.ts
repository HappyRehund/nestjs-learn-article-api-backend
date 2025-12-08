import { User } from "../entities/user.entity"
import { Role } from "../enum/role.enum"

export class GetUserResponseDto {
  name: string
  email: string
  role: Role

  static fromUser(user: User): GetUserResponseDto {
    const dto = new GetUserResponseDto()
    dto.email = user.email
    dto.name = user.name
    dto.role = user.role

    return dto
  }
}