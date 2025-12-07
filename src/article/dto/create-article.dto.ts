import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ArticleStatus } from "../enum/article-status.enum"

export class CreateArticleDto{

  @IsNotEmpty()
  @IsString()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsEnum(ArticleStatus)
  @IsOptional()
  status?: ArticleStatus

}