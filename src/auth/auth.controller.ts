import { Controller, Post, Body } from '@nestjs/common'
import { CreateUserDto } from './dtos/index'

@Controller('/api/auth')
export class AuthController {
  @Post('/register')
  register(@Body() body: CreateUserDto) {
    return body
  }

  @Post('/login')
  login() {}

  @Post('/logout')
  logout() {}
}
