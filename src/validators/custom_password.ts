import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export function IsCustomPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsCustomPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) return false
          const capitals = value.match(/[A-Z]/g)
          const digits = value.match(/[0-9]/g)
          if (!capitals || !digits) return false

          return true
        },
      },
    })
  }
}
