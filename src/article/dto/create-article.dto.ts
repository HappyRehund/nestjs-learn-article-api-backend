import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { ArticleStatus } from "../interface/article.interface"

export class CreateArticleDTO{

  @IsNotEmpty()
  @IsString()
  title: string

  @IsString()
  content: string

  @IsEnum(ArticleStatus)
  status: ArticleStatus

}