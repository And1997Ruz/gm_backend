import * as redisStore from 'cache-manager-redis-store'

export class RedisConfig {
  static getConfig() {
    return {
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }
  }

  static getEmailCodeKey(email: string) {
    return `${email}_code`
  }

  static getIsVerifiedEmailKey(email: string) {
    return `${email}_is_verified`
  }

  static sentCodeTTL = 600 // 10 minutes
  static verifiedEmailTTL = 3600 // 1 hour
}
