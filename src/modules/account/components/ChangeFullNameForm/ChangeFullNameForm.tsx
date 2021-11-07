import Form from '@ui/Form/Form';
import TextField from '@ui/Form/TextField';
import { ButtonSecondary } from '@ui/Button/Button';
import { InputRow } from '@ui/Row/Row';
import Text from '@ui/Text/Text';
import useTranslation from 'next-translate/useTranslation';
import { VFC } from 'react';
import useChangeFullNameForm from './useChangeFullNameForm';
import { Icon } from '@iconify/react';
import closeCircleFill from '@iconify/icons-eva/close-circle-fill';

const ChangeFullNameForm: VFC = () => {
  const { t } = useTranslation();
  const { form, submitError, onSubmit } = useChangeFullNameForm();
  return (
    <Form form={form} noValidate onSubmit={onSubmit}>
      <Text tw="mb-sm">
        {t('account:personal-info.change-name.description.main')}
      </Text>
      <InputRow tw="mb-sm">
        <TextField
          id="change-name-first-name"
          name="firstName"
          type="text"
          label={t('account:personal-info.change-name.first-name')}
        />
        <TextField
          id="change-name-last-name"
          name="lastName"
          type="text"
          label={t('account:personal-info.change-name.last-name')}
        />
      </InputRow>
      {submitError && (
        <Form.ErrorMessage
          role="alert"
          aria-relevant="text"
          tw="flex items-center gap-sm mb-sm"
        >
          <Icon icon={closeCircleFill} tw="w-5 h-5 fill-current" />
          {submitError}
        </Form.ErrorMessage>
      )}
      <ButtonSecondary
        type="submit"
        tw="px-xl"
        size="lg"
        disabled={form.formState.isSubmitting}
      >
        {t('account:personal-info.change-name.submit-button')}
      </ButtonSecondary>
    </Form>
  );
};

export default ChangeFullNameForm;
