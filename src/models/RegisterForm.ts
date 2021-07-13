import { isValidPassword } from '@utils/validate-password-utils';
import { Translate } from 'next-translate';
import * as yup from 'yup';
import { isNullOrUndefined } from '@utils/validate-js-utils';

export default class RegisterForm {
  firstName = '';
  lastName = '';
  gender = '';
  dob = null;
  email = '';
  password = '';

  constructor(source?: any) {
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
    const requiredMessage = t ? t('common:errors.form.required') : undefined;
    const emailMessage = t ? t('common:errors.form.invalid-email') : undefined;
    const selectMessage = t
      ? t('common:errors.form.unselected-dropdown')
      : undefined;
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
        .max(50)
        .test('is-strong-password', weakPasswordMessage, isValidPassword),
    });
  }
}
