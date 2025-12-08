import { ArticleStatus } from "../enums/article-status.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class Article{
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ unique: true })
  title: string

  @Column({
    type: 'text'
  })
  content: string

  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: ArticleStatus.PENDING
  })
  status: ArticleStatus

  @CreateDateColumn()
  readonly createdAt: Date

  @UpdateDateColumn()
  readonly updatedAt: Date
}