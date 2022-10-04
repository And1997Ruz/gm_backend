import { Module } from '@nestjs/common'
import { CategoriesModule } from './categories/categories.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './categories/categories.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV ?? 'development'}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('DB_URL'),
        type: 'postgres',
        database: config.get<string>('DB_NAME'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        port: config.get<number>('DB_PORT'),
        host: config.get<string>('DB_HOST'),
        entities: [Category],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
