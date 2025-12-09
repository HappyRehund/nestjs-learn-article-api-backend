import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserRequestDto } from './dto/register-user-request.dto';
import { RegisterUserResponseDto } from './dto/register-user-response.dto';
import { LoginUserRequestDto } from './dto/login-user-request.dto';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { AuthGuard } from './guards/manual-jwt-auth.guard';
import { RolesGuard } from './guards/role.guard';
import { Roles } from './decorators/role.decorator';
import { Role } from '../user/enums/role.enum';
import { LocalAuthGuard } from './guards/local-auth.guard';
import type { RequestPassedValidation } from './interfaces/request.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ){}

  @Post('register')
  async register(@Body() registerUserDto:RegisterUserRequestDto ): Promise<RegisterUserResponseDto> {
    return await this.authService.registerUser(registerUserDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestPassedValidation): Promise<LoginUserResponseDto>{
    return this.authService.login(req.user)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('test')
  getTest(): { message: string }{
    return {
      message: "Test Role Guard Berhasil"
    }
  }

  // NOT USED - THIS IS JUST FOR REFERENCe
  @HttpCode(HttpStatus.OK)
  @Post('loginOld')
  async loginOld(@Body() loginUserDto: LoginUserRequestDto): Promise<LoginUserResponseDto> {
    const { access_token, user } = await this.authService.loginUserOld(loginUserDto)

    return LoginUserResponseDto.fromUserAndToken(user, access_token)
  }
}
