import { Role } from "src/user/enums/role.enum"

export interface JwtPayloadData {
  id: string
  name: string
  email: string
  role: Role
}