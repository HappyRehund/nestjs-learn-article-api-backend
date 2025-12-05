import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ){}

  async createArticle(request: CreateArticleDto): Promise<Article>{
    const newArticle = this.articleRepository.create(request)
    return await this.articleRepository.save(newArticle)
  }

  async findAllArticles(): Promise<Article[]>{
    return await this.articleRepository.find()
  }

  async findArticleByIdOrFail(id: string): Promise<Article> {
    const article = await this.articleRepository.findOne(
      {
        where: {
          id: id
        }
      }
    )
    if (!article){
      throw new NotFoundException(`Article with id ${id} not found`)
    }

    return article;
  }

  async updateArticle(id: string, updateArticleDto: UpdateArticleDto): Promise<Article>{
    const article = await this.findArticleByIdOrFail(id)
    Object.assign(article, updateArticleDto)
    return await this.articleRepository.save(article)
  }

  async deleteArticle(id: string): Promise<void>{
    await this.findArticleByIdOrFail(id)
    await this.articleRepository.delete(id)
  }
}
