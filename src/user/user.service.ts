import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateRoleResponseDto } from './dto/update-role-response.dto';
import { UpdateRoleRequestDto } from './dto/update-role-request.dto';
import { GetUserResponseDto } from './dto/get-user-response.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){

  }
  async findAllUser(): Promise<GetUserResponseDto[]> {
    const users = await this.userRepository.find()

    return GetUserResponseDto.fromUsers(users)
  }

  async findOneUser(id: string): Promise<GetUserResponseDto> {
    const user = await this.findUserById(id)

    return GetUserResponseDto.fromUser(user)
  }

  async updateUserRole(id: string, request: UpdateRoleRequestDto): Promise<UpdateRoleResponseDto> {
    const user = await this.findUserById(id)

    user.role = request.role

    await this.userRepository.save(user)

    return UpdateRoleResponseDto.fromUser(user)
  }

  async updateUserRefreshToken(id: string, hashedRefreshToken: string){
    const user = await this.findUserById(id)

    user.hashedRefreshToken = hashedRefreshToken

    await this.userRepository.save(user)
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy(
      {
        id: id
      }
    )
    if(!user){
      throw new UnauthorizedException('user with this id not exists')
    }

    return user
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

  async findUserByIdWithHashedRT(id: string): Promise<User> {
    const user = await this.userRepository.findOne(
      {
        where: {
          id
        },
        select: ['id', 'name', 'email', 'role', 'hashedRefreshToken']
      }
    )
    if (!user){
      throw new UnauthorizedException(`user with name ${name} not exists`)
    }

    return user
  }
}
