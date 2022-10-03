import { Module } from '@nestjs/common'
import { CategoriesModule } from './categories/categories.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './categories/categories.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          database: 'general_market',
          username: 'postgres',
          password: 'root',
          port: 5432,
          host: 'localhost',
          entities: [Category],
          synchronize: true,
        }
      },
    }),
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
