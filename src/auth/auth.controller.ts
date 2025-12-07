import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponseDto } from './dto/create-user-response-dto';

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
}
