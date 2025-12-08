import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { GetUserResponseDto } from './dto/get-user-response.dto';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/role.guard';
import { Roles } from './decorators/role.decorator';
import { Role } from './enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ){}

  @Post('register')
  async register(@Body() createUserDto:CreateUserDto ): Promise<CreateUserResponseDto> {
    const newUser = await this.authService.createUser(createUserDto)
    return CreateUserResponseDto.fromUser(newUser);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
    const { access_token, user } = await this.authService.loginUser(loginUserDto)

    return LoginUserResponseDto.fromUserAndToken(user, access_token)
  }

  @UseGuards(AuthGuard)
  @Get('getuser')
  async getUser(@Request() request): Promise<GetUserResponseDto> {
    const user = await this.authService.getUser(request.user.id)
    return GetUserResponseDto.fromUser(user)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('test')
  getTest(): { message: string }{
    return {
      message: "Test Role Guard Berhasil"
    }
  }
}
