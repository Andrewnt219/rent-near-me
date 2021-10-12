import { isNullOrUndefined } from '@utils/validate-js-utils';
import { isValidPassword } from '@utils/validate-password-utils';
import { Translate } from 'next-translate';
import * as yup from 'yup';

type ChangePasswordSchema = Record<keyof ChangePasswordModel, yup.AnySchema>;
export default class ChangePasswordModel {
  uid = '';
  email = '';
  oldPassword = '';
  newPassword = '';
  confirmNewPassword = '';
  constructor(source?: Record<keyof ChangePasswordModel, any>) {
    if (!isNullOrUndefined(source)) {
      this.uid = source.uid;
      this.email = source.email;
      this.oldPassword = source.oldPassword;
      this.newPassword = source.newPassword;
      this.confirmNewPassword = source.confirmNewPassword;
    }
  }

  static getValidationSchema(t?: Translate) {
    const requiredMessage = t?.('common:errors.form.required');
    const maxLengthMessaage = t?.('common:errors.form.invalid-max-length', {
      length: 50,
    });
    const confirmPassowordMessage = t?.(
      'common:errors.form.confirm-password-not-match'
    );

    const weakPasswordMessage = t
      ? t('common:errors.form.weak-password')
      : 'weak password';

    return yup.object().shape<ChangePasswordSchema>({
      uid: yup.string().required(),
      email: yup.string().required(),
      oldPassword: yup.string().required(requiredMessage),
      newPassword: yup
        .string()
        .required(requiredMessage)
        .max(50, maxLengthMessaage)
        .test('is-strong-password', weakPasswordMessage, isValidPassword),
      confirmNewPassword: yup
        .string()
        .required(requiredMessage)
        .oneOf([yup.ref('newPassword'), null], confirmPassowordMessage),
    });
  }
}
