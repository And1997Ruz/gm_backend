export const ErrorMessages = {
  NOT_FOUND: 'Ресурс не найден',
  FILE_DELETE_ERROR: 'Произошла ошибка во время удаления файла',
  INTERNAL_ERROR: 'Произошла ошибка, повторите попытку позже...',
  EMAIL_NOT_VERIFIED: 'Адрес эл.почты не был подтвержден',
  EMAIL_CODE_DOESNT_EXIST: 'Указан неверный адрес эл.почты, или код подтверждения не найден',
  EMAIL_CODE_INCORRECT: 'Неверный код подтверждения',
  PASSWORD_INCORRECT: 'Неверный пароль',
  NO_AUTH_HEADERS: 'Необходимые заголовки для авторизации не найдены',
  INVALID_TOKEN: 'Токен подтверждения неверный, либо он был просрочен',
  AUTH_ERROR: 'Необходима авторизация для получения доступа',
}

export const ResponseMessages = {
  DELETE_SUCCESS: 'Ресурс был успешно удалён',
  EMAIL_CODE_SENT: 'Код подтверждения был выслан вам на почту',
  EMAIL_VERIFIED: 'Адрес эл.почты был успешно подтвержден. Вы должны зарегистрироваться в течении 1 часа',
  USER_CREATED: 'Пользователь успешно зарегистрирован',
  LOGIN_SUCCESS: 'Вы успешно вошли в свой аккаунт',
}

export enum RoleTypes {
  ADMIN = 'admin',
  USER = 'user',
}

export enum RoleTypeToRoleId {
  ADMIN = 1,
  USER = 2,
}
