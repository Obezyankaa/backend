import {
  registerDecorator,
  type ValidatorOptions,
  type ValidationArguments,
} from 'class-validator';

export function StartsWith(
  prefix: string,
  validationOptions?: ValidatorOptions,
) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'startsWith',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          return typeof value === 'string' && value.startsWith(prefix);
        },
        defaultMessage(args: ValidationArguments) {
          return `название должно начинаться с "${prefix}"`;
        },
      },
    });
  };
}
