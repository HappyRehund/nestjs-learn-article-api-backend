import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import type { IArticle } from './interface/article.interface';
import { RequestArticleDTO } from './dto/request-article.dto';
import { FindByIdParams } from './dto/find-by-id.params';

@Controller('article')
export class ArticleController {

  constructor(private readonly articleService: ArticleService){}

  @Get()
  findAll(): IArticle[] {
    return this.articleService.findAllArticles();
  }

  @Get("/:id")
  findById(@Param() params: FindByIdParams): IArticle {
    return this.findArticleById(params.id)
  }

  @Post()
  create(@Body() req: RequestArticleDTO): IArticle {
    return this.articleService.createArticle(req)
  }

  @Put("/:id")
  update(@Param() params: FindByIdParams, @Body() request: RequestArticleDTO): IArticle  {
    const article: IArticle = this.findArticleById(params.id)

    return this.articleService.updateArticle(article.id, request);
  }

  @Delete("/:id")
  delete(@Param() params: FindByIdParams): string {
    const article: IArticle = this.findArticleById(params.id)

    return this.articleService.deleteArticle(article.id)
  }

  private findArticleById(id: string): IArticle{
    const article = this.articleService.findArticleById(id)

    if (!article){
      throw new NotFoundException()
    }

    return article
  }
}