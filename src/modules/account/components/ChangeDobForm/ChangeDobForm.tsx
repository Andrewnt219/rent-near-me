import Form from '@ui/Form/Form';
import DateField from '@ui/Form/DateField';
import { ButtonSecondary } from '@ui/Button';
import useTranslation from 'next-translate/useTranslation';
import { VFC } from 'react';
import useChangeDobForm from './useChangeDobForm';
import { MAXIMUM_DOB } from '@models/constnats';

const ChangeDobForm: VFC = () => {
  const { t } = useTranslation();
  const { form, onSubmit } = useChangeDobForm();
  return (
    <Form form={form} noValidate onSubmit={onSubmit}>
      <DateField
        name="dob"
        label={t('account:personal-info.change-dob.dob')}
        dayPickerProps={{ disabledDays: { after: MAXIMUM_DOB } }}
        inputProps={{ 'auto-capitalize': 'words', autoComplete: 'bday' }}
      />

      <ButtonSecondary
        type="submit"
        size="lg"
        disabled={form.formState.isSubmitting}
      >
        {t('account:personal-info.change-gender.submit-button')}
      </ButtonSecondary>
    </Form>
  );
};

export default ChangeDobForm;
