import { isNullOrUndefined } from '@utils/validate-js-utils';
import { isValidPassword } from '@utils/validate-password-utils';
import { Translate } from 'next-translate';
import * as yup from 'yup';

export default class RegisterForm {
  firstName = '';
  lastName = '';
  gender = '';
  dob = null;
  email = '';
  password = '';

  constructor(source?: Record<keyof RegisterForm, any>) {
    if (!isNullOrUndefined(source)) {
      this.firstName = source.firstName;
      this.lastName = source.lastName;
      this.gender = source.gender;
      this.dob = source.dob;
      this.email = source.email;
      this.password = source.password;
    }
  }

  static genders = {
    male: 'Male',
    female: 'Female',
    other: 'Other',
    'not-given': 'Prefer not to say',
  };

  static getValidationSchema(t?: Translate) {
    const requiredMessage = t?.('common:errors.form.required');
    const emailMessage = t?.('common:errors.form.invalid-email');
    const selectMessage = t?.('common:errors.form.unselected-dropdown');
    const maxLengthMessaage = t?.('common:errors.form.invalid-max-length', {
      length: 50,
    });
    const weakPasswordMessage = t
      ? t('common:errors.form.weak-password')
      : 'weak password';

    return yup.object().shape({
      firstName: yup.string().required(requiredMessage).trim(),
      lastName: yup.string().required(requiredMessage).trim(),
      gender: yup
        .string()
        .required(requiredMessage)
        .trim()
        .oneOf(Object.keys(RegisterForm.genders), selectMessage),
      dob: yup.date().nullable().required(requiredMessage).max(new Date()),
      email: yup.string().required(requiredMessage).trim().email(emailMessage),
      password: yup
        .string()
        .required(requiredMessage)
        .max(50, maxLengthMessaage)
        .test('is-strong-password', weakPasswordMessage, isValidPassword),
    });
  }
}
