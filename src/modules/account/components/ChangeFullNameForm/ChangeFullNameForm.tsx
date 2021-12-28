import { Button } from '@ui/Button';
import Form from '@ui/Form/Form';
import TextField from '@ui/Form/TextField';
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
          name="firstName"
          type="text"
          label={t('account:personal-info.change-name.first-name')}
          autoCapitalize="words"
          autoComplete="given-name"
        />
        <TextField
          name="lastName"
          type="text"
          label={t('account:personal-info.change-name.last-name')}
          autoCapitalize="words"
          autoComplete="family-name"
        />
      </InputRow>

      <Button
        type="submit"
        size="lg"
        variant="secondary"
        disabled={form.formState.isSubmitting}
      >
        {t('account:personal-info.change-name.submit-button')}
      </Button>
    </Form>
  );
};

export default ChangeFullNameForm;
