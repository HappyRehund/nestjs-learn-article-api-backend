import { Injectable } from '@nestjs/common';
import { CreateArticleDTO } from './dto/create-article.dto';
import { UpdateArticleDTO } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>
  ){}

  async createArticle(request: CreateArticleDTO): Promise<Article>{
    const newArticle = this.articleRepository.create(request)
    return await this.articleRepository.save(newArticle)
  }

  async findAllArticles(): Promise<Article[]>{
    return await this.articleRepository.find()
  }

  async findArticleById(id: string): Promise<Article | null> {
    return await this.articleRepository.findOne(
      {
        where: {
          id: id
        }
      }
    )
  }

  async updateArticle(article: Article, request: UpdateArticleDTO): Promise<Article>{
    Object.assign(article, request)
    return await this.articleRepository.save(article)
  }

  async deleteArticle(id: string): Promise<void>{
    await this.articleRepository.delete(id)
  }
}
