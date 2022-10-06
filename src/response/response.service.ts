import { Injectable } from '@nestjs/common'
import { Response } from 'express'

interface ResponseBody {
  message: string
  data?: any
}

@Injectable()
export class ResponseService {
  constructor() {}

  sendResponse(response: Response, statusCode: number, message: string, data?: any) {
    const responseBody: ResponseBody = {
      message: message ?? 'Успешно',
    }
    if (data) {
      responseBody.data = data
    }
    return response.status(statusCode).json(responseBody)
  }
}
