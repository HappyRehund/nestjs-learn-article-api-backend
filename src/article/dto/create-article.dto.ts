import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ArticleStatus } from "../enums/article-status.enum"

export class CreateArticleDTO{

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