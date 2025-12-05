import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import { IdParams } from 'src/common/find-by-id.params';
import { CreateArticleDTO } from './dto/create-article.dto';
import { ArticleResponseDto } from './dto/article-response.dto';
import { UpdateArticleDTO } from './dto/update-article.dto';
import { Article } from './entities/article.entity';


@Controller('article')
export class ArticleController {

  constructor(private readonly articleService: ArticleService){}

  @Get()
  async findAll(): Promise<ArticleResponseDto[]> {
    const articles = await this.articleService.findAllArticles();
    return ArticleResponseDto.fromEntities(articles);
  }

  @Get("/:id")
  async findById(@Param() params: IdParams): Promise<ArticleResponseDto> {
    const article = await this.findArticleByIdOrFail(params.id);
    return ArticleResponseDto.fromEntity(article);
  }

  @Post()
  async create(@Body() req: CreateArticleDTO): Promise<ArticleResponseDto> {
    const newArticle = await this.articleService.createArticle(req);
    return ArticleResponseDto.fromEntity(newArticle);
  }

  @Put("/:id")
  async update(
    @Param() params: IdParams,
    @Body() request: UpdateArticleDTO
  ): Promise<ArticleResponseDto>  {
    const article = await this.findArticleByIdOrFail(params.id)
    const updated = await this.articleService.updateArticle(article, request);

    return ArticleResponseDto.fromEntity(updated);
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() params: IdParams): Promise<void> {
    await this.findArticleByIdOrFail(params.id)
    await this.articleService.deleteArticle(params.id)
  }

  // helper memthod
  private async findArticleByIdOrFail(id: string): Promise<Article>{
    const article = await this.articleService.findArticleById(id)

    if (!article){
      throw new NotFoundException(`Article with id ${id} not found`)
    }

    return article
  }
}