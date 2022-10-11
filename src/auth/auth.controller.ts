import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Response,
  HttpException,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common'
import { CreateUserDto, EmailVerifyDto, CodeVerifyDto, LoginDto } from './dtos/index'
import { AuthService } from './auth.service'
import { ResponseService } from './../response/response.service'
import { ResponseMessages } from './../config'
import { Response as ResponseType, Request } from 'express'
import { CookieConfig } from 'src/config/cookie.config'
import { AuthGuard } from './../guards/authGuard'

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService, private reponseService: ResponseService) {}

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

  @Post('/register')
  async register(@Body() body: CreateUserDto, @Response() response: ResponseType) {
    try {
      await this.authService.checkIsEmailVerified(body.email)
      const data = await this.authService.registerUser(body)

      response.cookie('refreshToken', data.tokens.refreshToken, CookieConfig.getCookieConfig())
      this.reponseService.sendResponse(response, 201, ResponseMessages.USER_CREATED, {
        accessToken: data.tokens.accessToken,
        user: data.user,
      })
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Post('/login')
  async login(@Body() body: LoginDto, @Response() response: ResponseType) {
    try {
      const data = await this.authService.login(body)

      response.cookie(CookieConfig.REFRESH_COOKIE_KEY, data.tokens.refreshToken, CookieConfig.getCookieConfig())
      this.reponseService.sendResponse(response, 200, ResponseMessages.LOGIN_SUCCESS, {
        accessToken: data.tokens.accessToken,
        user: data.user,
      })
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Post('/logout')
  logout() {
    //add auth guard
    //response.clearCookie('name')
  }

  @Post('/forgot-password')
  resetPassword() {}

  @Get('/refresh')
  @UseGuards(AuthGuard)
  getRefreshToken(@Req() request: Request) {
    const key = CookieConfig.REFRESH_COOKIE_KEY
    const cookie = request.signedCookies[key]
    const user = request.currentUser
    return { cookie, user }
  }
}
