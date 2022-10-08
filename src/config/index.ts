export const ErrorMessages = {
  NOT_FOUND: 'Ресурс не найден',
  FILE_DELETE_ERROR: 'Произошла ошибка во время удаления файла',
  INTERNAL_ERROR: 'Произошла ошибка, повторите попытку позже...',
}

export const ResponseMessages = {
  DELETE_SUCCESS: 'Ресурс был успешно удалён',
}

export enum RoleTypes {
  ADMIN = 'admin',
  USER = 'user',
}

export enum RoleTypeToRoleId {
  ADMIN = 1,
  USER = 2,
}
