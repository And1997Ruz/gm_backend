import { InternalServerErrorException } from '@nestjs/common'
import * as fs from 'fs'
import { ErrorMessages } from 'src/config'
import { Request } from 'express'

export const deleteFile = (filePath: string): void => {
  try {
    fs.unlinkSync(`./public/${filePath}`)
  } catch (error) {
    throw new InternalServerErrorException(ErrorMessages.FILE_DELETE_ERROR)
  }
}

export const getValidationMessage = (fieldName: string, message: string) => {
  return `${fieldName} - ${message}`
}

export const getAccessTokenFromHeader = (request: Request): string | null => {
  const authHeader = request.header('Authorization')
  if (!authHeader) return null
  const accessToken = authHeader.replace('Bearer ', '')
  return accessToken
}
