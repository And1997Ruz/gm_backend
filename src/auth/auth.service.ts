import { Injectable, Inject, CACHE_MANAGER, HttpException } from '@nestjs/common'
import { MailService } from 'src/mail/mail.service'
import { Cache } from 'cache-manager'
import { RedisConfig } from './../config/redis.config'
import { ResponseMessages } from 'src/config'

@Injectable()
export class AuthService {
  constructor(private mailService: MailService, @Inject(CACHE_MANAGER) private cacheService: Cache) {}

  async sendEmailVerificationCode(email: string, name: string): Promise<void> {
    const randomCode = Math.floor(1000 + Math.random() * 9000)
    await this.mailService.sendMail(email, name, randomCode)
    await this.cacheService.set(RedisConfig.getEmailCodeKey(email), randomCode, { ttl: RedisConfig.sentCodeTTL })
    await this.cacheService.set(RedisConfig.getIsVerifiedEmailKey(email), false, { ttl: RedisConfig.verifiedEmailTTL })
  }

  async verifyEmailCode(email: string, code: string): Promise<void> {
    const cachedCode = await this.cacheService.get<number>(RedisConfig.getEmailCodeKey(email))
    if (!cachedCode) throw new HttpException(ResponseMessages.EMAIL_CODE_DOESNT_EXIST, 400)
    if (cachedCode.toString() !== code) throw new HttpException(ResponseMessages.EMAIL_CODE_INCORRECT, 400)

    await this.cacheService.set(RedisConfig.getIsVerifiedEmailKey(email), true, { ttl: RedisConfig.verifiedEmailTTL })
    this.cacheService.del(RedisConfig.getEmailCodeKey(email))
  }
}
