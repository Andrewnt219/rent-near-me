import Form from '@ui/Form/Form';
import TextField from '@ui/Form/TextField';
import { ButtonSecondary } from '@ui/Button';
import { InputRow } from '@ui/Row/Row';
import Text from '@ui/Text/Text';
import useTranslation from 'next-translate/useTranslation';
import { VFC } from 'react';
import useChangeFullNameForm from './useChangeFullNameForm';

const ChangeFullNameForm: VFC = () => {
  const { t } = useTranslation();
  const { form, onSubmit } = useChangeFullNameForm();
  return (
    <Form form={form} noValidate onSubmit={onSubmit}>
      <Text tw="mb-sm">
        {t('account:personal-info.change-name.description.main')}
      </Text>
      <InputRow>
        <TextField
          id="change-name-first-name"
          name="firstName"
          type="text"
          label={t('account:personal-info.change-name.first-name')}
          autoCapitalize="words"
          autoComplete="given-name"
        />
        <TextField
          id="change-name-last-name"
          name="lastName"
          type="text"
          label={t('account:personal-info.change-name.last-name')}
          autoCapitalize="words"
          autoComplete="family-name"
        />
      </InputRow>

      <ButtonSecondary
        type="submit"
        size="lg"
        disabled={form.formState.isSubmitting}
      >
        {t('account:personal-info.change-name.submit-button')}
      </ButtonSecondary>
    </Form>
  );
};

export default ChangeFullNameForm;
