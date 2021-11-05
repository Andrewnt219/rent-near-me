import { ButtonLink, ButtonSecondary } from '@ui/Button/Button';
import Form from '@ui/Form/Form';
import PasswordCheckList from '@ui/PasswordCheckList/PasswordCheckList';
import PasswordField from '@ui/Form/PasswordField';
import HiddenField from '@ui/Form/HiddenField';
import useTranslation from 'next-translate/useTranslation';
import { useChangePasswordForm } from './useChangePasswordForm';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import { RiErrorWarningFill } from 'react-icons/ri';

function ChangePasswordForm() {
  const { t } = useTranslation();
  const { form, submitError, onSubmit, passwordValidationResults } =
    useChangePasswordForm();
  const { effectiveProvider } = useAuth();

  return (
    <Form form={form} noValidate onSubmit={onSubmit}>
      <HiddenField name="email" autoComplete="username" hiddenVisually />

      {effectiveProvider === 'password' && (
        <PasswordField
          id="change-password-old-password"
          name="oldPassword"
          label={t('account:security.change-password.old-password')}
          autoComplete="current-password"
          inputDescription={
            <ButtonLink type="button">
              {t('account:security.change-password.forget-password-link')}
            </ButtonLink>
          }
        />
      )}

      <PasswordField
        id="change-password-new-password"
        name="newPassword"
        label={t('account:security.change-password.new-password')}
        autoComplete="new-password"
      />

      <Form.Group>
        <PasswordCheckList
          passwordValidationResults={passwordValidationResults}
        />
      </Form.Group>

      <PasswordField
        id="change-password-confirm-new-password"
        name="confirmNewPassword"
        label={t('account:security.change-password.confirm-new-password')}
        autoComplete="new-password"
      />

      {submitError && (
        <Form.ErrorMessage
          role="alert"
          aria-relevant="text"
          tw="flex items-center gap-sm mb-sm"
        >
          <RiErrorWarningFill tw="w-5 h-5 fill-current" />
          {submitError}
        </Form.ErrorMessage>
      )}

      <ButtonSecondary
        type="submit"
        size="lg"
        disabled={form.formState.isSubmitting}
      >
        {t('account:security.change-password.submit-button')}
      </ButtonSecondary>
    </Form>
  );
}

export default ChangePasswordForm;
