import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { RegisterUserRequestDto } from './dto/register-user-request.dto';
import { Role } from '../user/enums/role.enum';
import { LoginUserRequestDto } from './dto/login-user-request.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { RegisterUserResponseDto } from './dto/register-user-response.dto';
import { ValidateLocalStrategyResponseDto } from './dto/validate-local-strategy-response.dto';

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
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }

    const access_token = await this.jwtService.signAsync(payload)

    return LoginUserResponseDto.fromValidateLocalStrategyAndToken(user, access_token)
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

  // DEPRECATED - NOTUSED - BUT STILL THERE FOR REFERENCE
  async loginUserOld (loginUserDto: LoginUserRequestDto): Promise<{access_token: string, user: User}>{

    const user = await this.userService.findUserByEmail(loginUserDto.email)

    if (!(await bcrypt.compare(loginUserDto.password, user.password))){
      throw new UnauthorizedException(`passwordmu salah goks`)
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    }

    const access_token = await this.jwtService.signAsync(payload)
    return {
      access_token,
      user
    }
  }
}
