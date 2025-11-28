import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('article')
export class ArticleController {

  @Get()
  findAll(): string {
    return "semua articles";
  }

  @Get("/:id")
  findById(@Param() params: any): string {
    return "satu article dengan id " + params.id;
  }

  @Post()
  create(@Body() req: { name: string, author: string }): string {
    return `membuat article dengan nama ${req.name} dan author ${req.author}`
  }

  @Put("/:id")
  update(@Param() params: any, @Body() req: { name: string, author: string }): string {
    return `update article dengan id ${params.id} dengan nama ${req.name} dan author ${req.author}`
  }

  @Delete("/:id")
  delete(@Param() params: any): string {
    return `hapus article dengan id -> ${params.id}`
  }
}