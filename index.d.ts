declare namespace Express {
  export interface Request {
    fileTypeValidationError: boolean
    currentUser: User | Null
  }
}
