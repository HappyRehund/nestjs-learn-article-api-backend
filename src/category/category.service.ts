import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ){}

  async createArticle(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(createCategoryDto)
    return await this.categoryRepository.save(newCategory);
  }

  async findAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find()
  }

  async findCategoryByIdOrFail(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id
      }
    });

    if(!category){
      throw new NotFoundException(`with id ${id} not found`)
    }

    return category;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findCategoryByIdOrFail(id)
    Object.assign(category, updateCategoryDto)
    return await this.categoryRepository.save(category)
  }

  async deleteCategory(id: string) {
    await this.findCategoryByIdOrFail(id)
    await this.categoryRepository.delete(id)
  }
}
