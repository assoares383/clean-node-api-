/* eslint-disable no-useless-constructor */
import { Validation } from '../../protocols/validation';
// eslint-disable-next-line import/no-useless-path-segments
import { InvalidParamError } from '../../errors';
import { EmailValidator } from '../../protocols/email-validator';

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
  ) {}

  validate(input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
