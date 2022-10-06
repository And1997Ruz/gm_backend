import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './categories.entity'
import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'
import { ResponseModule } from 'src/response/response.module'

@Module({
  imports: [TypeOrmModule.forFeature([Category]), ResponseModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
