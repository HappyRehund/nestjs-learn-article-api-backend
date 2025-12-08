import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './enums/role.enum';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService
  ){}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.dataSource.manager.transaction(async (transactionalEntityManager) => {

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
  }

  async loginUser (loginUserDto: LoginUserDto): Promise<{access_token: string, user: User}>{

    const user = await this.findUserByEmail(loginUserDto.email)

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

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy(
      {
        email: email
      }
    )
    if (!user){
      throw new UnauthorizedException(`user with email ${email} not exists`)
    }

    return user
  }

  async getUser(id: string): Promise<User>{
    const user = await this.userRepository.findOneBy({ id })

    if (!user){
      throw new NotFoundException(`User with id ${id} doesnt exists`)
    }
    return user;
  }
}
