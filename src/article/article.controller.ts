import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleResponseDto } from './dto/article-response.dto';
import { UpdateArticleDto } from './dto/update-article.dto';


@Controller('article')
export class ArticleController {

  constructor(private readonly articleService: ArticleService){}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<ArticleResponseDto> {
    const newArticle = await this.articleService.createArticle(createArticleDto);
    return ArticleResponseDto.fromEntity(newArticle);
  }

  @Get()
  async findAll(): Promise<ArticleResponseDto[]> {
    const articles = await this.articleService.findAllArticles();
    return ArticleResponseDto.fromEntities(articles);
  }

  @Get("/:id")
  async findOne(@Param('id') id: string): Promise<ArticleResponseDto> {
    const article = await this.articleService.findArticleByIdOrFail(id)
    return ArticleResponseDto.fromEntity(article);
  }

  @Put("/:id")
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto
  ): Promise<ArticleResponseDto>  {
    const updated = await this.articleService.updateArticle(id, updateArticleDto);
    return ArticleResponseDto.fromEntity(updated);
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.articleService.deleteArticle(id)
  }
}