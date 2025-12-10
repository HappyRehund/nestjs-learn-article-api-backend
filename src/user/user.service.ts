import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){

  }
  async findAllUser(): Promise<User[]> {
    return await this.userRepository.find()
  }


  async getUser(id: string): Promise<User>{
    const user = await this.userRepository.findOneBy({ id })

    if (!user){
      throw new NotFoundException(`User with id ${id} doesnt exists`)
    }
    return user;
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

  async findUserByName(name: string): Promise<User> {
    const user = await this.userRepository.findOneBy(
      {
        name
      }
    )
    if (!user){
      throw new UnauthorizedException(`user with name ${name} not exists`)
    }

    return user
  }
}
