import { InferFromSchema } from '@common-types';
import { Default_Date_Format, Genders, Maximum_Dob } from '@models/constnats';
import { isValidPassword } from '@utils/validate-password-utils';
import { Translate } from 'next-translate';
import * as yup from 'yup';
import dayjs from 'dayjs';

export const RegisterFormSchema = (t?: Translate) => {
  const requiredMessage = t?.('common:errors.form.required');
  const emailMessage = t?.('common:errors.form.invalid-email');
  const selectMessage = t?.('common:errors.form.unselected-dropdown');
  const dateMessage = t?.('common:errors.form.invalid-date') ?? 'invalid date';
  const maxLengthMessaage = t?.('common:errors.form.invalid-max-length', {
    length: 50,
  });
  const maxDateMessage = t?.('common:errors.form.max-date', {
    date: dayjs(Maximum_Dob).format(Default_Date_Format),
  });
  const weakPasswordMessage =
    t?.('common:errors.form.weak-password') ?? 'weak password';

  return yup.object().shape({
    firstName: yup.string().default('').required(requiredMessage).trim(),
    lastName: yup.string().default('').required(requiredMessage).trim(),
    gender: yup
      .string()
      .default('')
      .required(requiredMessage)
      .trim()
      .oneOf(Object.keys(Genders), selectMessage),
    dob: yup
      .date()
      .typeError(dateMessage)
      .default(null)
      .required(requiredMessage)
      .max(Maximum_Dob, maxDateMessage),
    email: yup
      .string()
      .default('')
      .required(requiredMessage)
      .trim()
      .email(emailMessage),
    password: yup
      .string()
      .default('')
      .required(requiredMessage)
      .max(50, maxLengthMessaage)
      .test('is-strong-password', weakPasswordMessage, isValidPassword),
  });
};

export type RegisterFormModel = InferFromSchema<
  ReturnType<typeof RegisterFormSchema>
>;
