import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { diskStorage } from 'multer'

export enum VALIDATION_CONFIG {
  NAME_MIN_LENGTH = 5,
  NAME_MAX_LENGTH = 255,
}

export const VALIDATION_MESSAGES = {
  STRING: 'Значение должно быть строкой',
  NAME_MIN_LENGTH: `Минимальное кол-во символов: ${VALIDATION_CONFIG.NAME_MIN_LENGTH}`,
  NAME_MAX_LENGTH: `Максимальное кол-во символов: ${VALIDATION_CONFIG.NAME_MAX_LENGTH}`,
}

export const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: './uploads/categories',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      const name = `${uniqueSuffix}.${file.originalname}`
      callback(null, name)
    },
  }),
}
