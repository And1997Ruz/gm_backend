import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException } from '@nestjs/common'
import { ErrorMessages } from 'src/config'
import { CookieConfig } from 'src/config/cookie.config'
import { JwtTokenService } from 'src/helpers/jwt'
import { User } from 'src/users/users.entity'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class RefreshGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const key = CookieConfig.REFRESH_COOKIE_KEY
    const refreshToken = request.signedCookies[key]

    if (!refreshToken) {
      throw new UnauthorizedException(ErrorMessages.AUTH_ERROR)
    }

    try {
      const decodedToken = jwt.verify(refreshToken, process.env.JWT_SECRET)
      if (!decodedToken) throw new UnauthorizedException(ErrorMessages.INVALID_TOKEN)

      const userId = JwtTokenService.getUserIdFromToken(refreshToken)
      if (!userId) throw new UnauthorizedException(ErrorMessages.AUTH_ERROR)
      const user = await User.findOneBy({ id: userId })
      request.currentUser = user
    } catch (error) {
      throw new HttpException(ErrorMessages.INVALID_TOKEN, 403)
    }

    return true
  }
}
