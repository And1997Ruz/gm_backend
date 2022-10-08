import { InternalServerErrorException } from '@nestjs/common'
import * as fs from 'fs'
import { ErrorMessages } from 'src/config'

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
