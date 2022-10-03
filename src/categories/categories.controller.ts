import { Controller, Post, Body } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dtos/create_category.dto'

@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() body: CreateCategoryDto) {
    return await this.categoriesService.create(body)
  }
}
