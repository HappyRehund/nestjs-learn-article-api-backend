import { User } from "src/user/entities/user.entity"
import { Profile } from "../entities/profile.entity"

export class CreateUpdateProfileResponseDto {

  age: number
  bio: string
  user: User

  static fromProfile(profile: Profile): CreateUpdateProfileResponseDto {
    const dto = new CreateUpdateProfileResponseDto()

    dto.age = profile.age
    dto.bio = profile.bio
    dto.user = profile.user

    return dto
  }
}