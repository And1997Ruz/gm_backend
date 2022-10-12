import { Controller, Post, Get, Body, Req, Response, HttpException, UseGuards } from '@nestjs/common'
import { CreateUserDto, EmailVerifyDto, CodeVerifyDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from './dtos/index'
import { AuthService } from './auth.service'
import { ResponseService } from './../response/response.service'
import { ResponseMessages } from './../config'
import { Response as ResponseType, Request } from 'express'
import { CookieConfig } from 'src/config/cookie.config'
import { AuthGuard } from './../guards/authGuard'
import { RefreshGuard } from './../guards/refreshGuard'
import { JwtTokenService } from 'src/helpers/jwt'
import { UsersService } from 'src/users/users.service'

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService, private reponseService: ResponseService, private usersService: UsersService) {}

  @Post('/email-verify')
  async sendVerificationCode(@Body() body: EmailVerifyDto, @Response() response: ResponseType) {
    try {
      await this.authService.sendEmailVerificationCode(body.email, body.name)
      this.reponseService.sendResponse(response, 200, ResponseMessages.EMAIL_CODE_SENT)
    } catch (error) {
      throw new HttpException(error.message, error.status)
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
      await this.authService.checkIsEmailVerifiedOrExists(body.email)
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
  @UseGuards(AuthGuard)
  logout(@Response() response: ResponseType) {
    response.clearCookie(CookieConfig.REFRESH_COOKIE_KEY)
    this.reponseService.sendResponse(response, 200, ResponseMessages.LOGOUT_SUCCESS)
  }

  @Post('/forgot-password-email')
  async sendForgotPasswordCode(@Body() body: ForgotPasswordDto, @Response() response: ResponseType) {
    try {
      await this.usersService.getUserByEmail(body.email)
      await this.authService.sendForgotPasswordCode(body.email)
      this.reponseService.sendResponse(response, 200, ResponseMessages.EMAIL_CODE_SENT)
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Post('/forgot-password-code')
  async verifyForgotPasswordCode(@Body() body: CodeVerifyDto, @Response() response: ResponseType) {
    try {
      await this.authService.verifyForgotPasswordCode(body.email, body.code)
      this.reponseService.sendResponse(response, 200, ResponseMessages.FORGOT_PASSWORD_VERIFIED)
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Post('/reset-password')
  async resetPassword(@Body() body: ResetPasswordDto, @Response() response: ResponseType) {
    await this.authService.checkCanResetPassword(body.email)
    await this.usersService.resetPassword(body)
    await this.authService.revokePermissionToResetPassword(body.email)
    this.reponseService.sendResponse(response, 200, ResponseMessages.PASSWORD_RESET)
  }

  @Get('/refresh')
  @UseGuards(RefreshGuard)
  getRefreshToken(@Req() request: Request, @Response() response: ResponseType) {
    const tokens = JwtTokenService.createTokens(request.currentUser)
    response.cookie(CookieConfig.REFRESH_COOKIE_KEY, tokens.refreshToken, CookieConfig.getCookieConfig())
    this.reponseService.sendResponse(response, 200, ResponseMessages.REFRESH_SUCCESS, {
      newAccessToken: tokens.accessToken,
    })
  }
}
