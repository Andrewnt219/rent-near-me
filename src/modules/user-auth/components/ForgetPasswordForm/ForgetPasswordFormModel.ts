import { InferFromSchema } from '@common-types';
import { Translate } from 'next-translate';
import * as yup from 'yup';

export const ForgetPasswordFormSchema = (t?: Translate) => {
  const requiredMessage = t?.('common:errors.form.required');
  const emailMessage = t?.('common:errors.form.invalid-email');
  return yup.object().shape({
    email: yup
      .string()
      .default('')
      .required(requiredMessage)
      .trim()
      .email(emailMessage),
  });
};

export type ForgetPasswordFormModel = InferFromSchema<
  ReturnType<typeof ForgetPasswordFormSchema>
>;
