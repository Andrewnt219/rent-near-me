import Form from '@ui/Form/Form';
import { ButtonSecondary } from '@ui/Button';
import useTranslation from 'next-translate/useTranslation';
import { VFC } from 'react';
import useChangeGenderForm from './useChangeGenderForm';
import Select from '@ui/Form/Select';
import { GENDERS } from '@models/constnats';

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

export default ChangeGenderForm;
