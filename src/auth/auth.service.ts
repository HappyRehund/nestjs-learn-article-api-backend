import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { RegisterUserRequestDto } from './dto/register-user-request.dto';
import { Role } from '../user/enums/role.enum';
import { LoginUserRequestDto } from './dto/login-user-request.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { RegisterUserResponseDto } from './dto/register-user-response.dto';
import { ValidateLocalStrategyResponseDto } from './dto/validate-local-strategy-response.dto';
import { jwtConstants } from './constants/auth.constant';
import { JwtPayloadData } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,

  ){}

  async registerUser(createUserDto: RegisterUserRequestDto): Promise<RegisterUserResponseDto> {
    const newUser = await this.dataSource.manager.transaction(async (transactionalEntityManager) => {

      const existingUser = await transactionalEntityManager.findOne(User, {
        where: [
          {email: createUserDto.email},
          {name: createUserDto.name}
        ]
      })

      if (existingUser) {
        if (existingUser.email === createUserDto.email){
          throw new ConflictException(`User dengan email ${existingUser.email} sudah ada`)
        }
        if (existingUser.name === createUserDto.name){
          throw new ConflictException(`User dengan nama ${existingUser.name} sudah ada`)
        }
      }

      const hashPassword = await bcrypt.hash(createUserDto.password, 10)

      const newUser = transactionalEntityManager.create(User, {
        ...createUserDto,
        password: hashPassword,
        role: Role.USER
      })

      return await transactionalEntityManager.save(newUser)
    })

    return RegisterUserResponseDto.fromUser(newUser)
  }

  async login(user: ValidateLocalStrategyResponseDto): Promise<LoginUserResponseDto>{

    const tokens = await this.generateTokens(user.id, user.name, user.email, user.role)

    await this.updateRefreshTokenHash(user.id, tokens.refreshToken)

    return LoginUserResponseDto.fromValidateLocalStrategyAndTokens(user, tokens.accessToken, tokens.refreshToken)
  }

  async validateUser(email: string, password: string): Promise<ValidateLocalStrategyResponseDto> {
    const user = await this.userService.findUserByEmail(email)

    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (user && isCorrectPassword ){
      return ValidateLocalStrategyResponseDto.fromUser(user)
    } else {
      throw new UnauthorizedException("Username atau password salah")
    }
  }

  async generateTokens(id: string, name: string, email: string, role: Role): Promise<{ accessToken: string, refreshToken: string }> {
    const payload: JwtPayloadData = {
      id,
      name,
      email,
      role
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        payload,
        {
          secret: jwtConstants.secret_access,
          expiresIn: jwtConstants.access_expiration
        }
      ),

      this.jwtService.signAsync(
        payload,
        {
          secret: jwtConstants.secret_refresh,
          expiresIn: jwtConstants.refresh_expiration
        }
      )
    ]);

    return { accessToken, refreshToken };
  }

  async generateAccessToken(id: string, name: string, email: string, role: Role): Promise<string> {
    const payload: JwtPayloadData = {
      id,
      name,
      email,
      role
    }

    return await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret_access,
      expiresIn: jwtConstants.access_expiration
    })
  }

  async updateRefreshTokenHash(id: string, refreshToken: string){
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)
    await this.userService.updateUserRefreshToken(id, hashedRefreshToken)
  }

  async refreshToken(id: string, refreshToken: string){

    const user = await this.userService.findUserByIdWithHashedRT(id)

    if(!user || !user.hashedRefreshToken) throw new ForbiddenException('Access Denied')

    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.hashedRefreshToken)

    if(!refreshTokenMatches) throw new ForbiddenException('Access Denied')

    const accessToken = await this.generateAccessToken(user.id, user.name, user.email, user.role)

    return {
      accessToken,
      refreshToken
    }
  }

  // DEPRECATED - NOTUSED - BUT STILL THERE FOR REFERENCE
  async loginUserOld (loginUserDto: LoginUserRequestDto): Promise<{accessToken: string, user: User}>{

    const user = await this.userService.findUserByEmail(loginUserDto.email)

    if (!(await bcrypt.compare(loginUserDto.password, user.password))){
      throw new UnauthorizedException(`passwordmu salah goks`)
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    }

    const accessToken = await this.jwtService.signAsync(payload)
    return {
      accessToken,
      user
    }
  }
}
