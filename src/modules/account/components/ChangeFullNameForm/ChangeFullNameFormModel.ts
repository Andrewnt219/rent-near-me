import { InferFromSchema } from '@common-types';
import { Translate } from 'next-translate';
import * as yup from 'yup';

export const ChangeFullNameFormSchema = (t?: Translate) => {
  const requiredMessage = t?.('common:errors.form.required');
  return yup.object().shape({
    firstName: yup.string().default('').required(requiredMessage).trim(),
    lastName: yup.string().default('').required(requiredMessage).trim(),
  });
};

export type ChangeFullNameFormModel = InferFromSchema<
  ReturnType<typeof ChangeFullNameFormSchema>
>;
