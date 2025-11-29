import { Injectable } from '@nestjs/common';
import type { IArticle } from './interface/article.interface';
import { CreateArticleDTO } from './dto/create-article.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ArticleService {

  private readonly articles: IArticle[] = [];

  createArticle(createArticleDTO: CreateArticleDTO): IArticle{
    const newArticle: IArticle = {
      id: randomUUID(),
      ...createArticleDTO
    }

    this.articles.push(newArticle)

    return newArticle
  }

  findAllArticles(): IArticle[]{
    return this.articles
  }
}
