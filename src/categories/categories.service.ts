import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm/dist'
import { Category } from './categories.entity'
import { CreateCategoryDto } from './dtos/create_category.dto'

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  async create(payload: CreateCategoryDto): Promise<Category> {
    try {
      const category = this.repo.create(payload)
      return this.repo.save(category)
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
