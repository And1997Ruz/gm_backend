import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm/dist'
import { Category } from './categories.entity'
import { CategoryDto } from './dtos/category.dto'
import { ErrorMessages } from './../config'
import { deleteFile } from 'src/helpers'

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  getAllCategories(): Promise<Category[]> {
    try {
      return this.repo.find()
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  create(payload: CategoryDto, file: Express.Multer.File): Promise<Category> {
    if (file) {
      const newFilePath = file.path.replace('public\\', '')
      const formattedPath = (newFilePath as any).replaceAll('\\', '/')
      Object.assign(payload, {
        image: formattedPath,
      })
    }
    try {
      const category = this.repo.create(payload)
      return this.repo.save(category)
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async edit(id: number, payload: Partial<CategoryDto>, file: Express.Multer.File) {
    let item: Category
    if (file) {
      const newFilePath = file.path.replace('public\\', '')
      const formattedPath = (newFilePath as any).replaceAll('\\', '/')
      Object.assign(payload, {
        image: formattedPath,
      })
    }
    item = await this.repo.findOneBy({ id: id })
    if (!item) {
      if (file) {
        deleteFile(`/uploads/categories/${file.filename}`)
      }
      throw new NotFoundException(ErrorMessages.NOT_FOUND)
    }
    const oldImage = item.image
    try {
      Object.assign(item, payload)
      const updatedItem = await this.repo.save(item)
      if (file && oldImage) {
        deleteFile(oldImage)
      }
      return updatedItem
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async deleteOne(id: number): Promise<void> {
    const item = await this.repo.findOneBy({ id: id })
    if (!item) throw new NotFoundException(ErrorMessages.NOT_FOUND)
    try {
      await this.repo.remove(item)
      if (item.image) {
        deleteFile(item.image)
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message ?? ErrorMessages.INTERNAL_ERROR)
    }
  }
}
