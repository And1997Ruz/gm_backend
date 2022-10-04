import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator'
import { VALIDATION_MESSAGES, VALIDATION_CONFIG } from '../config'

export class CreateCategoryDto {
  @IsString({
    message: VALIDATION_MESSAGES.STRING,
  })
  @MinLength(VALIDATION_CONFIG.NAME_MIN_LENGTH, {
    message: VALIDATION_MESSAGES.NAME_MIN_LENGTH,
  })
  @MaxLength(VALIDATION_CONFIG.NAME_MAX_LENGTH, {
    message: VALIDATION_MESSAGES.NAME_MAX_LENGTH,
  })
  name: any

  @IsOptional()
  image: string
}
