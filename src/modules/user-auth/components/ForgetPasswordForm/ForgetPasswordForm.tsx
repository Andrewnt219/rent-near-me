import { Icon } from '@iconify/react';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import { ButtonPrimary } from '@ui/Button/Button';
import Form from '@ui/Form/Form';
import TextField from '@ui/Form/TextField';
import Text from '@ui/Text/Text';
import useTranslation from 'next-translate/useTranslation';
import useForgetPasswordForm from './useForgetPasswordForm';

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
        id="forget-password-email"
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
            <Icon icon={alertTriangleFill} tw="w-5 h-5 fill-current" />
            {submitError}
          </Form.ErrorMessage>
        )}
      </div>

      <ButtonPrimary
        size="md"
        type="submit"
        tw="block w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting
          ? t('common:forgetPassword.submitButton.loading')
          : t('common:forgetPassword.submitButton.submit')}
      </ButtonPrimary>
    </Form>
  );
};

export default ForgetPasswordForm;
