import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { ArticleStatus } from "../interface/article.interface"

export class RequestArticleDTO{

  @IsNotEmpty()
  @IsString()
  title: string

  @IsString()
  content: string

  @IsEnum(ArticleStatus)
  status: ArticleStatus

}