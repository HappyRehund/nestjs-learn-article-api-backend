import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResponseDto } from './dto/category-response-dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const newCategory = await this.categoryService.createArticle(createCategoryDto)
    return CategoryResponseDto.fromEntity(newCategory);
  }

  @Get()
  async findAll(): Promise<CategoryResponseDto[]> {
    const articles = await this.categoryService.findAllCategories();
    return CategoryResponseDto.fromEntities(articles)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryResponseDto> {
    const article = await this.categoryService.findCategoryByIdOrFail(id)
    return CategoryResponseDto.fromEntity(article)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ): Promise<CategoryResponseDto> {
    const updated = await this.categoryService.updateCategory(id, updateCategoryDto)
    return CategoryResponseDto.fromEntity(updated)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}
