import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express/multer'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dtos/create_category.dto'
import { multerOptions } from './config'

@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async createCategory(@Body() body: CreateCategoryDto, @UploadedFile() file: Express.Multer.File) {
    console.log('fil3434e', file)
    return await this.categoriesService.create(body)
  }
}
