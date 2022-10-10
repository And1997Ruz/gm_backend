export enum ValidationConfig {
  NAME_MIN_LENGTH = 5,
  NAME_MAX_LENGTH = 30,
  EMAIL_MIN_LENGTH = 5,
  EMAIL_MAX_LENGTH = 30,
  PASSWORD_MIN_LENGTH = 5,
  PASSWORD_MAX_LENGTH = 30,
}

export const ValidationMessages = {
  STRING: 'Значение должно быть строкой',
  EMPTY: 'Поле не должно быть пустым',
  NAME_MIN_LENGTH: `Минимальное кол-во символов: ${ValidationConfig.NAME_MIN_LENGTH}`,
  NAME_MAX_LENGTH: `Максимальное кол-во символов: ${ValidationConfig.NAME_MAX_LENGTH}`,
  EMAIL_MIN_LENGTH: `Минимальное кол-во символов: ${ValidationConfig.EMAIL_MIN_LENGTH}`,
  EMAIL_MAX_LENGTH: `Максимальное кол-во символов: ${ValidationConfig.EMAIL_MAX_LENGTH}`,
  EMAIL: 'Укажите адрес эл.почты корректного формата',
  PASSWORD_MIN_LENGTH: `Минимальное кол-во символов: ${ValidationConfig.PASSWORD_MIN_LENGTH}`,
  PASSWORD_MAX_LENGTH: `Максимальное кол-во символов: ${ValidationConfig.PASSWORD_MAX_LENGTH}`,
  PASSWORD_FORMAT: 'Пароль должен содержать минимум 1 цифру и одну заглавную букву',
}
