import { Module, NestModule, CacheModule, MiddlewareConsumer } from '@nestjs/common'
import { CategoriesModule } from './categories/categories.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ResponseModule } from './response/response.module'
import { RolesModule } from './roles/roles.module'
import { TypeOrmConfig } from './config/typeorm.config'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { MailerModule } from '@nestjs-modules/mailer/dist'
import { MailerConfig } from './config/mailer.config'
import { MailModule } from './mail/mail.module'
import { RedisConfig } from './config/redis.config'
import { CurrentUserMiddleware } from './middleware/currentUser.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV ?? 'development'}.env`,
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => MailerConfig.getConfig(config),
    }),
    CacheModule.register(RedisConfig.getConfig()),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => TypeOrmConfig.getConfig(config),
      inject: [ConfigService],
    }),
    CategoriesModule,
    ResponseModule,
    RolesModule,
    UsersModule,
    AuthModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
