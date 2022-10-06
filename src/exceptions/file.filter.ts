import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class FileExceptionFilter implements ExceptionFilter {
  constructor(private sizeLimit: number) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const errorResponse: any = exception.getResponse()
    const errorMessage = errorResponse?.message ?? ''

    if (status === 413) {
      return response.status(status).json({
        statusCode: status,
        message: `Максимальный размер файла ${this.sizeLimit}mb`,
      })
    }
    return response.status(400).json({
      statusCode: status,
      message: errorMessage ?? exception.message,
    })
  }
}
