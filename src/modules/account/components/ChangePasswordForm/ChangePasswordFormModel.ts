import { InferFromSchema } from '@common-types';
import { isValidPassword } from '@utils/validate-password-utils';
import { Translate } from 'next-translate';
import * as yup from 'yup';

export const Schema = (t?: Translate) => {
  const requiredMessage = t?.('common:errors.form.required');
  const maxLengthMessaage = t?.('common:errors.form.invalid-max-length', {
    length: 50,
  });
  const confirmPassowordMessage = t?.(
    'common:errors.form.confirm-password-not-match'
  );

  const weakPasswordMessage =
    t?.('common:errors.form.weak-password') ?? 'weak password';

  return yup.object().shape({
    uid: yup.string().default('').required(),
    email: yup.string().default(''),
    oldPassword: yup.string().default(''),
    newPassword: yup
      .string()
      .default('')
      .required(requiredMessage)
      .max(50, maxLengthMessaage)
      .test('is-strong-password', weakPasswordMessage, isValidPassword),
    confirmNewPassword: yup
      .string()
      .default('')
      .required(requiredMessage)
      .oneOf([yup.ref('newPassword'), null], confirmPassowordMessage),
  });
};

export type Model = InferFromSchema<ReturnType<typeof Schema>>;
