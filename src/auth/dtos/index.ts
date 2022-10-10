import { IsString, MinLength, MaxLength, IsEmail, IsNotEmpty } from 'class-validator'
import { IsCustomPassword } from '../../validators/custom_password'
import { ValidationConfig, ValidationMessages } from '../config'
import { getValidationMessage } from 'src/helpers'

export class CreateUserDto {
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

  @IsEmail(
    {},
    {
      message: getValidationMessage('email', ValidationMessages.EMAIL),
    },
  )
  @MinLength(ValidationConfig.EMAIL_MIN_LENGTH, {
    message: getValidationMessage('email', ValidationMessages.EMAIL_MIN_LENGTH),
  })
  @MaxLength(ValidationConfig.EMAIL_MAX_LENGTH, {
    message: getValidationMessage('email', ValidationMessages.EMAIL_MAX_LENGTH),
  })
  email: string

  @IsCustomPassword({
    message: getValidationMessage('password', ValidationMessages.PASSWORD_FORMAT),
  })
  @IsString({
    message: getValidationMessage('password', ValidationMessages.STRING),
  })
  @MinLength(ValidationConfig.PASSWORD_MIN_LENGTH, {
    message: getValidationMessage('password', ValidationMessages.PASSWORD_MIN_LENGTH),
  })
  @MaxLength(ValidationConfig.PASSWORD_MAX_LENGTH, {
    message: getValidationMessage('password', ValidationMessages.PASSWORD_MAX_LENGTH),
  })
  password: string
}

export class EmailVerifyDto {
  @IsEmail(
    {},
    {
      message: getValidationMessage('email', ValidationMessages.EMAIL),
    },
  )
  email: string

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

export class CodeVerifyDto {
  @IsEmail(
    {},
    {
      message: getValidationMessage('email', ValidationMessages.EMAIL),
    },
  )
  email: string

  @IsNotEmpty({ message: getValidationMessage('code', ValidationMessages.EMPTY) })
  code: string
}
