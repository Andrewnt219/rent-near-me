import { ButtonLink, ButtonSecondary } from '@ui/Button/Button';
import Form from '@ui/Form/Form';
import PasswordCheckList from '@ui/PasswordCheckList/PasswordCheckList';
import PasswordField from '@ui/Form/PasswordField';
import HiddenField from '@ui/Form/HiddenField';
import useTranslation from 'next-translate/useTranslation';
import { useChangePasswordForm } from './useChangePasswordForm';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';

function ChangePasswordForm() {
  const { t } = useTranslation();
  const { form, onSubmit, passwordValidationResults } = useChangePasswordForm();
  const { effectiveProvider } = useAuth();

  return (
    <Form form={form} noValidate onSubmit={onSubmit}>
      <HiddenField name="email" autoComplete="username" hiddenVisually />

      {effectiveProvider === 'password' && (
        <PasswordField
          id="edit-password-old-password"
          name="oldPassword"
          label={t('account:security.edit-password.old-password')}
          autoComplete="current-password"
          inputDescription={
            <ButtonLink type="button">Need a new password?</ButtonLink>
          }
        />
      )}

      <PasswordField
        id="edit-password-new-password"
        name="newPassword"
        label={t('account:security.edit-password.new-password')}
        autoComplete="new-password"
      />

      <Form.Group>
        <PasswordCheckList
          passwordValidationResults={passwordValidationResults}
        />
      </Form.Group>

      <PasswordField
        id="edit-password-confirm-new-password"
        name="confirmNewPassword"
        label={t('account:security.edit-password.confirm-new-password')}
        autoComplete="new-password"
      />

      <ButtonSecondary
        type="submit"
        size="lg"
        disabled={form.formState.isSubmitting}
      >
        Update Password
      </ButtonSecondary>
    </Form>
  );
}

export default ChangePasswordForm;
