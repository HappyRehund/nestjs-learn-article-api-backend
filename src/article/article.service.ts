import { Injectable } from '@nestjs/common';
import type { IArticle } from './interface/article.interface';
import { RequestArticleDTO } from './dto/request-article.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ArticleService {

  private readonly articles: IArticle[] = [];

  createArticle(request: RequestArticleDTO): IArticle{
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

  updateArticle(id: string, request: RequestArticleDTO): IArticle{

    const index = this.articles.findIndex(article => article.id === id)
    if (index !== -1){
      throw new Error("article not found")
    }

    const updatedArticle: IArticle = {
      id,
      ...request
    }

    this.articles[index] = updatedArticle

    return updatedArticle
  }

  deleteArticle(id: string): string{
    const index = this.articles.findIndex(article => article.id === id);
    if (index !== -1){
      this.articles.splice(index, 1);
    }
    return "deleted"
  }
}
