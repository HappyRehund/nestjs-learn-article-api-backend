import { User } from "../entities/user.entity"
import { Role } from "../enums/role.enum"

export class GetUserResponseDto {
  id: string
  name: string
  email: string
  role: Role

  static fromUser(user: User): GetUserResponseDto {
    const dto = new GetUserResponseDto()
    dto.id = user.id
    dto.email = user.email
    dto.name = user.name
    dto.role = user.role

    return dto
  }

  static fromUsers(users: User[]): GetUserResponseDto[] {
    return users.map(user => this.fromUser(user))
  }
}