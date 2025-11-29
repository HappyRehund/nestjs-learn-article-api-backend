import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import type { IArticle } from './interface/article.interface';
import { CreateArticleDTO } from './dto/create-article.dto';

@Controller('article')
export class ArticleController {

  constructor(private readonly articleService: ArticleService){}

  @Get()
  findAll(): IArticle[] {
    return this.articleService.findAllArticles();
  }

  @Get("/:id")
  findById(@Param() params: any): string {
    return "satu article dengan id " + params.id;
  }

  @Post()
  create(@Body() createArticleDTO: CreateArticleDTO): IArticle {
    return this.articleService.createArticle(createArticleDTO)
  }

  @Put("/:id")
  update(@Param() params: any, @Body() req: { name: string, author: string }): string {
    return `update article dengan id ${params.id} dengan nama ${req.name} dan author ${req.author}`
  }

  @Delete("/:id")
  delete(@Param() params: any): string {
    return `hapus article dengan id -> ${params.id}`
  }
}