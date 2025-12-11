import { Body, Controller, Get, Param, Put, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/manual-jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from './enums/role.enum';
import { GetUserResponseDto } from './dto/get-user-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { RequestWithJwtPayload } from 'src/interfaces/request.interface';
import { UpdateRoleRequestDto } from './dto/update-role-request.dto';
import { UpdateRoleResponseDto } from './dto/update-role-response.dto';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService
  ){}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<GetUserResponseDto[]> {
    return await this.userService.findAllUser()
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getUser(@Request() request: RequestWithJwtPayload): Promise<GetUserResponseDto> {
    return await this.userService.findOneUser(request.user.id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put('/:id')
  async updateUserRole(
    @Param('id') id: string,
    @Body() updateRoleRequestDto: UpdateRoleRequestDto
  ): Promise<UpdateRoleResponseDto> {
    return await this.userService.updateUserRole(id, updateRoleRequestDto)
  }
}
