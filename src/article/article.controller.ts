import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import type { IArticle } from './interface/article.interface';
import { RequestCreateArticleDTO } from './dto/create-article.dto';
import { FindByIdParams } from './dto/find-by-id.params';
import { RequestUpdateArticleDTO } from './dto/update-article.dto';

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
  create(@Body() req: RequestCreateArticleDTO): IArticle {
    return this.articleService.createArticle(req)
  }

  @Put("/:id")
  update(@Param() params: FindByIdParams, @Body() request: RequestUpdateArticleDTO): IArticle  {
    const article: IArticle = this.findArticleById(params.id)

    return this.articleService.updateArticle(article, request);
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: FindByIdParams): void {
    const article: IArticle = this.findArticleById(params.id)

    return this.articleService.deleteArticle(article.id)
  }

  // helper memthod
  private findArticleById(id: string): IArticle{
    const article = this.articleService.findArticleById(id)

    if (!article){
      throw new NotFoundException()
    }

    return article
  }
}