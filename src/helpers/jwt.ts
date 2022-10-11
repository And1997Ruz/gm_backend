import { User } from './../users/users.entity'
import * as jwt from 'jsonwebtoken'

export class JwtTokenService {
  private static formatTokenBody(user: User) {
    return { id: user.id, name: user.name, email: user.email }
  }

  static createAccessToken(user: User) {
    const expiresIn = parseInt(process.env.JWT_ACCESS_EXPIRATION)
    const payload = this.formatTokenBody(user)
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn,
    })

    return accessToken
  }

  static createRefreshToken(user: User) {
    const expiresIn = parseInt(process.env.JWT_REFRESH_EXPIRATION)
    const payload = this.formatTokenBody(user)
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn,
    })

    return refreshToken
  }

  static createTokens(user: User) {
    const accessToken = this.createAccessToken(user)
    const refreshToken = this.createRefreshToken(user)

    return {
      accessToken,
      refreshToken,
    }
  }

  static getUserIdFromToken(token: string): number | null {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      //@ts-ignore
      const userId = decodedToken?.id
      return userId ?? null
    } catch (error) {
      return null
    }
  }
}
