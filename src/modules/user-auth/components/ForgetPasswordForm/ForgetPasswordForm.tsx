import { Icon } from '@iconify/react';
import closeCircleFill from '@iconify/icons-eva/close-circle-fill';
import Form from '@ui/Form/Form';
import TextField from '@ui/Form/TextField';
import Text from '@ui/Text/Text';
import useTranslation from 'next-translate/useTranslation';
import useForgetPasswordForm from './useForgetPasswordForm';
import { Button } from '@ui/Button';

const ForgetPasswordForm = () => {
  const { form, onSubmit, submitError } = useForgetPasswordForm();
  const { t } = useTranslation();

  return (
    <Form form={form} noValidate onSubmit={onSubmit}>
      <Text variant="body1" tw="mb-md">
        {t('common:forgetPassword.description')}
      </Text>

      <TextField
        label={t('common:forgetPassword.email')}
        type="email"
        name="email"
        autoComplete="username"
      />

      <div tw="min-h-[5rem]">
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
      </div>

      <Button
        type="submit"
        size="md"
        variant="primary"
        tw="block w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting
          ? t('common:forgetPassword.submitButton.loading')
          : t('common:forgetPassword.submitButton.submit')}
      </Button>
    </Form>
  );
};

export default ForgetPasswordForm;
