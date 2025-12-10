import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/manual-jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from './enums/role.enum';
import { GetUserResponseDto } from './dto/get-user-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { RequestWithJwtPayload } from 'src/interfaces/request.interface';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService
  ){}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<GetUserResponseDto[]> {
    const users = await this.userService.findAllUser()
    return GetUserResponseDto.fromUsers(users)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUser(@Request() request: RequestWithJwtPayload): Promise<GetUserResponseDto> {
    const user = await this.userService.getUser(request.user.id)
    return GetUserResponseDto.fromUser(user)
  }
}
