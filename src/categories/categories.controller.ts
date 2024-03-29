import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Request as Req,
  Response,
  UseFilters,
  BadRequestException,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express/multer'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto, UpdateCategoryDto } from './dtos'
import { FileExceptionFilter } from 'src/exceptions/file.filter'
import { multerOptions, ValidationMessages } from './config'
import { Request, Response as ResponseType } from 'express'
import { ResponseService } from 'src/response/response.service'
import { ResponseMessages } from 'src/config'

@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService, private responseService: ResponseService) {}

  @Get()
  async getAllCategories() {
    return await this.categoriesService.getAllCategories()
  }

  @Post()
  @UseFilters(new FileExceptionFilter(2))
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async createCategory(@Body() body: CreateCategoryDto, @UploadedFile() file: Express.Multer.File, @Req() request: Request) {
    if (request.fileTypeValidationError) {
      throw new BadRequestException(ValidationMessages.FILE_TYPE)
    }
    return await this.categoriesService.create(body, file)
  }

  @Patch('/:id')
  @UseFilters(new FileExceptionFilter(2))
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async editCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ) {
    if (request.fileTypeValidationError) {
      throw new BadRequestException(ValidationMessages.FILE_TYPE)
    }
    return await this.categoriesService.edit(id, body, file)
  }

  @Delete('/:id')
  async deleteOneCategory(@Param('id', ParseIntPipe) id: number, @Response() response: ResponseType) {
    await this.categoriesService.deleteOne(id)
    this.responseService.sendResponse(response, 200, ResponseMessages.DELETE_SUCCESS)
  }
}
