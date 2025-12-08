import { Article } from "../entities/article.entity";
import { ArticleStatus } from "../enums/article-status.enum";


export class ArticleResponseDto {
  id: string;
  title: string;
  content: string;
  status: ArticleStatus;
  createdAt: Date;
  updatedAt: Date;

  static fromEntity(entity: Article): ArticleResponseDto {
    const dto = new ArticleResponseDto();
    dto.id = entity.id
    dto.title = entity.title;
    dto.content = entity.content;
    dto.status = entity.status;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto
  }

  static fromEntities(entities: Article[]): ArticleResponseDto[] {
    return entities.map(entity => this.fromEntity(entity))
  }
}