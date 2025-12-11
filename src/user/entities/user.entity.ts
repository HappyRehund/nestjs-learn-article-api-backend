import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../enums/role.enum";
import { Profile } from "src/profile/entities/profile.entity";

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

  @Column({
    type: 'varchar',
    nullable: true,
    select: false
  })
  hashedRefreshToken: string | null

  @OneToOne(() => Profile, (profile) => profile.user )
  profile: Profile

  @CreateDateColumn()
  readonly createdAt: Date

  @UpdateDateColumn()
  readonly updatedAt: Date
}