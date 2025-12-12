import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CreateUpdateProfileRequestDto } from './dto/create-update-profile-request.dto';
import { CreateUpdateProfileResponseDto } from './dto/create-update-profile-response.dto';

@Injectable()
export class ProfileService {

  constructor(
    private readonly userService: UserService,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ){}

  async updateOrCreateProfile(
    userId: string,
    createUpdateProfilReqDto: CreateUpdateProfileRequestDto
  ): Promise<CreateUpdateProfileResponseDto> {

    const user = await this.userService.findUserById(userId)

    let profile = await this.profileRepository.findOne({
      where: {
        user: {
          id: userId
        }
      },
      relations: ['user']
    })

    if (profile) {
      profile.age = createUpdateProfilReqDto.age
      profile.bio = createUpdateProfilReqDto.bio
    } else {
      profile = this.profileRepository.create({
        age: createUpdateProfilReqDto.age,
        bio: createUpdateProfilReqDto.bio,
        user: user
      })
    }
    const savedProfile = await this.profileRepository.save(profile)

    const profileWithUser = await this.profileRepository.findOne({
      where: {
        id: savedProfile.id
      },
      relations: ['user']
    })

    return CreateUpdateProfileResponseDto.fromProfile(profileWithUser!)
  }

}
