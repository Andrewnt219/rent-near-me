import { isNullOrUndefined } from '@utils/validate-js-utils';
import { isValidPassword } from '@utils/validate-password-utils';
import { Translate } from 'next-translate';
import * as yup from 'yup';

type EditPasswordSchema = Record<keyof EditPasswordModel, yup.AnySchema>;
export default class EditPasswordModel {
  oldPassword = '';
  newPassword = '';
  confirmNewPassword = '';
  constructor(source?: Record<keyof EditPasswordModel, any>) {
    if (!isNullOrUndefined(source)) {
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

    return yup.object().shape<EditPasswordSchema>({
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
