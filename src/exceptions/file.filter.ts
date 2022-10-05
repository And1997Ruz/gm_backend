import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class FileExceptionFilter implements ExceptionFilter {
  constructor(private sizeLimit: number) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()

    if (status === 413) {
      return response.status(status).json({
        statusCode: status,
        message: `Максимальный размер файла ${this.sizeLimit}mb`,
      })
    }
    return response.json({
      statusCode: status,
      message: exception.message,
    })
  }
}
