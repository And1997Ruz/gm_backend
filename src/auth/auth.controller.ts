import { Controller, Post, Body } from '@nestjs/common'
import { CreateUserDto } from './dtos/index'
import { MailService } from 'src/mail/mail.service'

@Controller('/api/auth')
export class AuthController {
  constructor(private mailService: MailService) {}
  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    const randomCode = Math.floor(1000 + Math.random() * 9000)
    await this.mailService.sendMail(body.email, body.name, randomCode)
    return body
  }

  @Post('/login')
  login() {}

  @Post('/logout')
  logout() {}
}
