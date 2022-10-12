import { Injectable, Inject, CACHE_MANAGER, HttpException, ForbiddenException } from '@nestjs/common'
import { MailService } from 'src/mail/mail.service'
import { Cache } from 'cache-manager'
import { RedisConfig } from './../config/redis.config'
import { ErrorMessages } from 'src/config'
import { CreateUserDto, LoginDto } from './dtos/index'
import { UsersService } from 'src/users/users.service'
import { JwtTokenService } from 'src/helpers/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    private usersService: UsersService,
  ) {}

  async sendEmailVerificationCode(email: string, name: string): Promise<void> {
    const existingEmail = await this.cacheService.get(RedisConfig.getEmailCodeKey(email))
    if (existingEmail) throw new ForbiddenException(ErrorMessages.EMAIL_ALREADY_SENT)

    const randomCode = Math.floor(1000 + Math.random() * 9000)
    await this.mailService.sendEmailVerificationMail(email, name, randomCode)
    await this.cacheService.set(RedisConfig.getEmailCodeKey(email), randomCode, { ttl: RedisConfig.sentCodeTTL })
    await this.cacheService.set(RedisConfig.getIsVerifiedEmailKey(email), false, { ttl: RedisConfig.verifiedEmailTTL })
  }

  async sendForgotPasswordCode(email: string): Promise<void> {
    const existingEmail = await this.cacheService.get(RedisConfig.getForgotPassowrdKey(email))
    if (existingEmail) throw new ForbiddenException(ErrorMessages.EMAIL_ALREADY_SENT)

    const randomCode = Math.floor(1000 + Math.random() * 9000)
    await this.mailService.sendForgotPasswordMail(email, randomCode)
    await this.cacheService.set(RedisConfig.getForgotPassowrdKey(email), randomCode, { ttl: RedisConfig.sentCodeTTL })
    await this.cacheService.set(RedisConfig.getCanChangePasswordKey(email), false, { ttl: RedisConfig.verifiedEmailTTL })
  }

  async verifyEmailCode(email: string, code: string): Promise<void> {
    const cachedCode = await this.cacheService.get<number>(RedisConfig.getEmailCodeKey(email))
    if (!cachedCode) throw new HttpException(ErrorMessages.EMAIL_CODE_DOESNT_EXIST, 400)
    if (cachedCode.toString() !== code) throw new HttpException(ErrorMessages.EMAIL_CODE_INCORRECT, 400)

    await this.cacheService.set(RedisConfig.getIsVerifiedEmailKey(email), true, { ttl: RedisConfig.verifiedEmailTTL })
    this.cacheService.del(RedisConfig.getEmailCodeKey(email))
  }

  async verifyForgotPasswordCode(email: string, code: string): Promise<void> {
    const cachedCode = await this.cacheService.get<number>(RedisConfig.getForgotPassowrdKey(email))
    if (!cachedCode) throw new HttpException(ErrorMessages.EMAIL_CODE_DOESNT_EXIST, 400)
    if (cachedCode.toString() !== code) throw new HttpException(ErrorMessages.EMAIL_CODE_INCORRECT, 400)

    await this.cacheService.set(RedisConfig.getCanChangePasswordKey(email), true, { ttl: RedisConfig.verifiedEmailTTL })
    this.cacheService.del(RedisConfig.getForgotPassowrdKey(email))
  }

  async checkIsEmailVerifiedOrExists(email: string) {
    const isEmailInUse = await this.usersService.isEmailInUse(email)
    if (isEmailInUse) throw new ForbiddenException(ErrorMessages.EMAIL_ALREADY_IN_USE)

    const isVerified = await this.cacheService.get(RedisConfig.getIsVerifiedEmailKey(email))
    if (!isVerified) throw new ForbiddenException(ErrorMessages.EMAIL_NOT_VERIFIED)
  }

  async checkCanResetPassword(email: string) {
    const isVerified = await this.cacheService.get(RedisConfig.getCanChangePasswordKey(email))
    if (!isVerified) throw new ForbiddenException(ErrorMessages.EMAIL_NOT_VERIFIED)
  }

  async revokePermissionToResetPassword(email: string) {
    await this.cacheService.del(RedisConfig.getCanChangePasswordKey(email))
  }

  async registerUser(payload: CreateUserDto) {
    const user = await this.usersService.createUser(payload)
    const tokens = JwtTokenService.createTokens(user)

    const responseBody = {
      tokens,
      user,
    }
    return responseBody
  }

  async login(payload: LoginDto) {
    const user = await this.usersService.getUserByEmail(payload.email)
    const isCorrectPassword = await bcrypt.compare(payload.password, user.password)
    if (!isCorrectPassword) throw new HttpException(ErrorMessages.PASSWORD_INCORRECT, 400)

    const tokens = JwtTokenService.createTokens(user)

    const responseBody = {
      tokens,
      user,
    }
    return responseBody
  }
}
