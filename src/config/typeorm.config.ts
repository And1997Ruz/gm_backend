import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Role } from './../roles/roles.entity'
import { Category } from './../categories/categories.entity'
import { User } from './../users/users.entity'

export class TypeOrmConfig {
  static getConfig(config: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      database: config.get<string>('DB_NAME'),
      username: config.get<string>('DB_USER'),
      password: config.get<string>('DB_PASSWORD'),
      port: config.get<number>('DB_PORT'),
      host: config.get<string>('DB_HOST'),
      entities: [Category, Role, User],
      synchronize: true,
    }
  }
}
