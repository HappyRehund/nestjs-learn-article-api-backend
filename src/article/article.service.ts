import { Injectable } from '@nestjs/common';
import type { IArticle } from './interface/article.interface';
import { RequestCreateArticleDTO } from './dto/create-article.dto';
import { randomUUID } from 'crypto';
import { RequestUpdateArticleDTO } from './dto/update-article.dto';

@Injectable()
export class ArticleService {

  private readonly articles: IArticle[] = [];

  createArticle(request: RequestCreateArticleDTO): IArticle{
    const newArticle: IArticle = {
      id: randomUUID(),
      ...request
    }

    this.articles.push(newArticle)

    return newArticle
  }

  findAllArticles(): IArticle[]{
    return this.articles
  }

  findArticleById(id: string): IArticle | undefined {
    return this.articles.find( article => article.id === id);
  }

  updateArticle(article: IArticle, request: RequestUpdateArticleDTO): IArticle{
    Object.assign(article, request)
    return article
  }

  deleteArticle(id: string): void{
    const index = this.articles.findIndex(article => article.id === id);
    if (index !== -1){
      this.articles.splice(index, 1);
    }
  }
}
