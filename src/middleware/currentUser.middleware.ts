import { Injectable, NestMiddleware, HttpException, UnauthorizedException } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { getAccessTokenFromHeader } from 'src/helpers'
import { JwtTokenService } from 'src/helpers/jwt'
import { ErrorMessages } from 'src/config'
import { User } from 'src/users/users.entity'

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor() {}
  async use(request: Request, response: Response, next: NextFunction) {
    const accessToken = getAccessTokenFromHeader(request)
    if (!accessToken) {
      request.currentUser = null
      return next()
    }
    try {
      const userId = JwtTokenService.getUserIdFromToken(accessToken)
      if (!userId) throw new UnauthorizedException(ErrorMessages.AUTH_ERROR)
      const user = await User.findOneBy({ id: userId })
      request.currentUser = user
      return next()
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
