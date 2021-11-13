import { InferFromSchema } from '@common-types';
import { DATE_TIME_FORMATS, MAXIMUM_DOB } from '@models/constnats';
import dayjs from 'dayjs';
import { Translate } from 'next-translate';
import * as yup from 'yup';

export const ChangeDobFormSchema = (t?: Translate) => {
  const requiredMessage = t?.('common:errors.form.required');
  const dateMessage = t?.('common:errors.form.invalid-date') ?? 'invalid date';
  const maxDateMessage = t?.('common:errors.form.max-date', {
    date: dayjs(MAXIMUM_DOB).format(DATE_TIME_FORMATS.LONG_DATE),
  });
  return yup.object().shape({
    dob: yup
      .date()
      .typeError(dateMessage)
      .default(null)
      .required(requiredMessage)
      .max(MAXIMUM_DOB, maxDateMessage),
  });
};

export type ChangeDobFormModel = InferFromSchema<
  ReturnType<typeof ChangeDobFormSchema>
>;
