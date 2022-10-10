export const ErrorMessages = {
  NOT_FOUND: 'Ресурс не найден',
  FILE_DELETE_ERROR: 'Произошла ошибка во время удаления файла',
  INTERNAL_ERROR: 'Произошла ошибка, повторите попытку позже...',
}

export const ResponseMessages = {
  DELETE_SUCCESS: 'Ресурс был успешно удалён',
  EMAIL_CODE_SENT: 'Код подтверждения был выслан вам на почту',
  EMAIL_CODE_DOESNT_EXIST: 'Указан неверный адрес эл.почты, или код подтверждения не найден',
  EMAIL_CODE_INCORRECT: 'Неверный код подтверждения',
  EMAIL_VERIFIED: 'Адрес эл.почты был успешно подтвержден. Вы должны зарегистрироваться в течении 1 часа',
}

export enum RoleTypes {
  ADMIN = 'admin',
  USER = 'user',
}

export enum RoleTypeToRoleId {
  ADMIN = 1,
  USER = 2,
}
