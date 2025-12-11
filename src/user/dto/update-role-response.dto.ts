import { User } from "../entities/user.entity"
import { Role } from "../enums/role.enum"

export class UpdateRoleResponseDto {

  email: string
  role: Role

  static fromUser(user: User): UpdateRoleResponseDto {
    const dto = new UpdateRoleResponseDto()
    dto.email = user.email
    dto.role = user.role

    return dto
  }
}