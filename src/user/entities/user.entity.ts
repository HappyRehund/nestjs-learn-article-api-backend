import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../enums/role.enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({unique: true})
  email: string

  @Column({unique: true})
  name: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER
  })
  role: Role

  @CreateDateColumn()
  readonly createdAt: Date

  @UpdateDateColumn()
  readonly updatedAt: Date
}