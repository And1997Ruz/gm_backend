import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Request as Req,
  UseFilters,
  BadRequestException,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express/multer'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dtos/create_category.dto'
import { FileExceptionFilter } from 'src/exceptions/file.filter'
import { multerOptions, ValidationMessages } from './config'
import { Request } from 'express'

@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  @UseFilters(new FileExceptionFilter(2))
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async createCategory(@Body() body: CreateCategoryDto, @UploadedFile() file: Express.Multer.File, @Req() request: Request) {
    if (request.fileTypeValidationError) {
      throw new BadRequestException(ValidationMessages.FILE_TYPE)
    }
    return await this.categoriesService.create(body, file)
  }
}
