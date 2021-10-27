import { InferFromSchema } from '@common-types';
import { Translate } from 'next-translate';
import * as yup from 'yup';

export const LoginFormSchema = (t?: Translate) => {
  const requiredMessage = t?.('common:errors.form.required');
  const emailMessage = t?.('common:errors.form.invalid-email');
  return yup.object().shape({
    email: yup
      .string()
      .default('')
      .required(requiredMessage)
      .trim()
      .email(emailMessage),
    password: yup.string().default('').required(requiredMessage),
    keepLogIn: yup.boolean().default(false),
  });
};

export type LoginFormModel = InferFromSchema<
  ReturnType<typeof LoginFormSchema>
>;
