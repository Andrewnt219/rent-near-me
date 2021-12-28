import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Button } from '@ui/Button';
import Form from '@ui/Form/Form';
import Select from '@ui/Form/Select';
import { GENDERS } from '@models/constnats';
import useChangeGenderForm from './useChangeGenderForm';

const ChangeGenderForm: VFC = () => {
  const { t } = useTranslation();
  const { form, onSubmit } = useChangeGenderForm();
  return (
    <Form form={form} noValidate onSubmit={onSubmit}>
      <Select
        name="gender"
        label={t('account:personal-info.change-gender.gender')}
        autoComplete="sex"
      >
        <option value="" disabled></option>
        {Object.entries(GENDERS).map(([key, val]) => (
          <option key={key} value={key}>
            {val}
          </option>
        ))}
      </Select>

      <Button
        type="submit"
        size="lg"
        variant="secondary"
        disabled={form.formState.isSubmitting}
      >
        {t('account:personal-info.change-gender.submit-button')}
      </Button>
    </Form>
  );
};

export default ChangeGenderForm;
