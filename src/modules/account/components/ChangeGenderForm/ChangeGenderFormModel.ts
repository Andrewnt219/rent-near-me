import { InferFromSchema } from '@common-types';
import { GENDERS } from '@models/constnats';
import { Translate } from 'next-translate';
import * as yup from 'yup';

export const ChangeGenderFormSchema = (t?: Translate) => {
  const requiredMessage = t?.('common:errors.form.required');
  const selectMessage = t?.('common:errors.form.unselected-dropdown');
  return yup.object().shape({
    gender: yup
      .string()
      .default('')
      .required(requiredMessage)
      .trim()
      .oneOf(Object.keys(GENDERS), selectMessage),
  });
};

export type ChangeGenderFormModel = InferFromSchema<
  ReturnType<typeof ChangeGenderFormSchema>
>;
