import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator'
import { ValidationMessages, ValidationConfig } from '../config'
import { getValidationMessage } from 'src/helpers'

export class CreateCategoryDto {
  @IsString({
    message: getValidationMessage('name', ValidationMessages.STRING),
  })
  @MinLength(ValidationConfig.NAME_MIN_LENGTH, {
    message: getValidationMessage('name', ValidationMessages.NAME_MIN_LENGTH),
  })
  @MaxLength(ValidationConfig.NAME_MAX_LENGTH, {
    message: getValidationMessage('name', ValidationMessages.NAME_MAX_LENGTH),
  })
  name: string
}

export class UpdateCategoryDto {
  @IsString({
    message: getValidationMessage('name', ValidationMessages.STRING),
  })
  @MinLength(ValidationConfig.NAME_MIN_LENGTH, {
    message: getValidationMessage('name', ValidationMessages.NAME_MIN_LENGTH),
  })
  @MaxLength(ValidationConfig.NAME_MAX_LENGTH, {
    message: getValidationMessage('name', ValidationMessages.NAME_MAX_LENGTH),
  })
  @IsOptional()
  name: string
}
