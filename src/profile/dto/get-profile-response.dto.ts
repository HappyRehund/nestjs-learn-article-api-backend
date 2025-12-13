import { User } from "src/user/entities/user.entity"
import { Profile } from "../entities/profile.entity"

export class GetProfileResponseDto {

  age: number
  bio: string
  user: User

  static fromProfile(profile: Profile): GetProfileResponseDto {
    const dto = new GetProfileResponseDto()

    dto.age = profile.age
    dto.bio = profile.bio
    dto.user = profile.user

    return dto
  }
}