import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { ErrorMessages } from 'src/config'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    if (!request.currentUser) throw new UnauthorizedException(ErrorMessages.AUTH_ERROR)
    return true
  }
}
