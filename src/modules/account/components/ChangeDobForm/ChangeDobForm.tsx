import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Form from '@ui/Form/Form';
import DateField from '@ui/Form/DateField';
import { Button } from '@ui/Button';
import { MAXIMUM_DOB } from '@models/constnats';
import useChangeDobForm from './useChangeDobForm';

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

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        disabled={form.formState.isSubmitting}
      >
        {t('account:personal-info.change-gender.submit-button')}
      </Button>
    </Form>
  );
};

export default ChangeDobForm;
