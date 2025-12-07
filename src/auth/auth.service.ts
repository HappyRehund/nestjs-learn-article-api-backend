import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './enum/role.enum';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource
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


}
