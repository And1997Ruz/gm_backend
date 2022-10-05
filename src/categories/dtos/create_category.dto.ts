import { IsString, MinLength, MaxLength } from 'class-validator'
import { ValidationMessages, ValidationConfig } from '../config'

export class CreateCategoryDto {
  @IsString({
    message: ValidationMessages.STRING,
  })
  @MinLength(ValidationConfig.NAME_MIN_LENGTH, {
    message: ValidationMessages.NAME_MIN_LENGTH,
  })
  @MaxLength(ValidationConfig.NAME_MAX_LENGTH, {
    message: ValidationMessages.NAME_MAX_LENGTH,
  })
  name: string
}
