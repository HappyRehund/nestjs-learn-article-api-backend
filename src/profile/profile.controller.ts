import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { RequestWithJwtPayload } from 'src/interfaces/request.interface';
import { CreateUpdateProfileRequestDto } from './dto/create-update-profile-request.dto';
import { CreateUpdateProfileResponseDto } from './dto/create-update-profile-response.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {

  constructor(private readonly profileService: ProfileService){}

  @Post()
  async createOrUpdateProfile(
    @Req() req: RequestWithJwtPayload,
    @Body() createUpdateProfileRequestDto: CreateUpdateProfileRequestDto
  ): Promise<CreateUpdateProfileResponseDto>{
    const userId = req.user.id
    return await this.profileService.updateOrCreateProfile(userId, createUpdateProfileRequestDto)
  }
}
