import { Controller, Post, Body, Response, HttpException, InternalServerErrorException } from '@nestjs/common'
import { CreateUserDto, EmailVerifyDto, CodeVerifyDto } from './dtos/index'
import { AuthService } from './auth.service'
import { ResponseService } from './../response/response.service'
import { ResponseMessages } from './../config'
import { Response as ResponseType } from 'express'

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService, private reponseService: ResponseService) {}
  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    //check redis, if and1997ruz@gmail.com_is_verified is false or null, throw error
    return body
  }

  @Post('/email-verify')
  async sendVerificationCode(@Body() body: EmailVerifyDto, @Response() response: ResponseType) {
    try {
      await this.authService.sendEmailVerificationCode(body.email, body.name)
      this.reponseService.sendResponse(response, 200, ResponseMessages.EMAIL_CODE_SENT)
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  @Post('/code-verify')
  async verifyEmailCode(@Body() body: CodeVerifyDto, @Response() response: ResponseType) {
    try {
      await this.authService.verifyEmailCode(body.email, body.code)
      this.reponseService.sendResponse(response, 200, ResponseMessages.EMAIL_VERIFIED)
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Post('/login')
  login() {}

  @Post('/logout')
  logout() {}
}
