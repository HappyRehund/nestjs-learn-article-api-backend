import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserResponseDto } from './dto/login-user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ){}

  @Post('register')
  async register(@Body() createUserDto:CreateUserDto ): Promise<CreateUserResponseDto> {
    const newUser = await this.authService.createUser(createUserDto)
    return CreateUserResponseDto.fromEntity(newUser);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
    const { access_token, user } = await this.authService.loginUser(loginUserDto)

    return LoginUserResponseDto.fromUserAndToken(user, access_token)
  }
}
