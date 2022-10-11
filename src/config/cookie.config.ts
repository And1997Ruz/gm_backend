export class CookieConfig {
  static getCookieConfig() {
    const maxAge = parseInt(process.env.COOKIE_MAX_AGE)
    return {
      httpOnly: true,
      secure: false,
      signed: true,
      maxAge,
    }
  }
  static REFRESH_COOKIE_KEY = 'refreshToken'
}
