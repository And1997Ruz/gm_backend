import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from './../users/users.module'
import { MailModule } from './../mail/mail.module'
import { ResponseModule } from 'src/response/response.module'

@Module({
  imports: [UsersModule, MailModule, ResponseModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
