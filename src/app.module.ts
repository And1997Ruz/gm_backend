import { Module } from '@nestjs/common'
import { CategoriesModule } from './categories/categories.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ResponseModule } from './response/response.module'
import { RolesModule } from './roles/roles.module'
import { TypeOrmConfig } from './config/typeorm.config'
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV ?? 'development'}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => TypeOrmConfig.getConfig(config),
      inject: [ConfigService],
    }),
    CategoriesModule,
    ResponseModule,
    RolesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
