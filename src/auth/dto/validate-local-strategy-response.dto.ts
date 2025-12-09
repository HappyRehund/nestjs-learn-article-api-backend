import { User } from "src/user/entities/user.entity"
import { Role } from "src/user/enums/role.enum"

export class ValidateLocalStrategyResponseDto{
  id: string
  name: string
  email: string
  role: Role

  static fromUser(user: User): ValidateLocalStrategyResponseDto {
    const dto = new ValidateLocalStrategyResponseDto()

    dto.id = user.id
    dto.name = user.name
    dto.email = user.email
    dto.role = user.role

    return dto
  }
}