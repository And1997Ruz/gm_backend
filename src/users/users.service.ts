import { Injectable, HttpException } from '@nestjs/common'
import { CreateUserDto } from './../auth/dtos/index'
import { InjectRepository } from '@nestjs/typeorm/dist'
import { Repository } from 'typeorm'
import { User } from './users.entity'
import { ResponseMessages, ErrorMessages } from 'src/config'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async createUser(payload: CreateUserDto) {
    const user = this.repo.create(payload)
    return await this.repo.save(user)
  }

  async getUserByEmail(email: string) {
    const user = await this.repo.findOneBy({ email })
    if (!user) throw new HttpException(ErrorMessages.NOT_FOUND, 404)
    return user
  }

  async getUserById(id: number) {
    const user = await this.repo.findOneBy({ id })
    if (!user) throw new HttpException(ErrorMessages.NOT_FOUND, 404)
    return user
  }
}
