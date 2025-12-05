import { Category } from "../entities/category.entity";


export class CategoryResponseDto {
  name: string;

  static fromEntity(entity: Category): CategoryResponseDto {
    const dto = new CategoryResponseDto();
    dto.name = entity.name;
    return dto
  }

  static fromEntities(entities: Category[]): CategoryResponseDto[] {
    return entities.map(entity => this.fromEntity(entity))
  }
}