import { Translate } from 'next-translate';
import * as yup from 'yup';

export default class LoginFormModel {
  email = '';
  keepLogIn = false;
  password = '';

  static getValidationSchema(t?: Translate) {
    const requiredMessage = t ? t('common:errors.form.required') : undefined;
    const emailMessage = t ? t('common:errors.form.invalid-email') : undefined;
    return yup.object().shape({
      email: yup.string().required(requiredMessage).trim().email(emailMessage),
      password: yup.string().required(requiredMessage),
    });
  }
}
