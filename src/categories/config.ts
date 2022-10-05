import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { diskStorage } from 'multer'
import { extname } from 'path'

export enum ValidationConfig {
  NAME_MIN_LENGTH = 5,
  NAME_MAX_LENGTH = 255,
}

export const ValidationMessages = {
  STRING: 'Значение должно быть строкой',
  NAME_MIN_LENGTH: `Минимальное кол-во символов: ${ValidationConfig.NAME_MIN_LENGTH}`,
  NAME_MAX_LENGTH: `Максимальное кол-во символов: ${ValidationConfig.NAME_MAX_LENGTH}`,
  FILE_TYPE: 'Допустимый формат файла: jpeg, jpg, png',
}

export const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: './public/uploads/categories',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      const name = `${uniqueSuffix}.${file.originalname}`
      callback(null, name)
    },
  }),
  fileFilter: (req, file, callback) => {
    const supportedExtensions = ['.png', '.jpeg', '.jpg']
    const ext = extname(file.originalname)

    if (!supportedExtensions.includes(ext.toLowerCase())) {
      req.fileTypeValidationError = true
      return callback(null, false)
    }
    callback(null, true)
  },
  limits: {
    //2mb
    fileSize: 2048 * 1024,
  },
}
