import { ButtonLink, ButtonSecondary } from '@ui/Button/Button';
import Form from '@ui/Form/Form';
import PasswordCheckList from '@ui/PasswordCheckList/PasswordCheckList';
import PasswordField from '@ui/Form/PasswordField';
import HiddenField from '@ui/Form/HiddenField';
import useTranslation from 'next-translate/useTranslation';
import { useChangePasswordForm } from './useChangePasswordForm';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';

type Props = {
  className?: string;
};
function ChangePasswordForm({ className, ...props }: Props) {
  const { t } = useTranslation();
  const { form, controllers, onSubmit, passwordValidationResults } =
    useChangePasswordForm();
  const { effectiveProvider } = useAuth();

  return (
    <Form className={className} tw="" noValidate onSubmit={onSubmit}>
      <HiddenField
        controller={controllers.email}
        autoComplete="username"
        hiddenVisually
      />

      {effectiveProvider === 'password' && (
        <PasswordField
          controller={controllers.oldPassword}
          id="edit-password-old-password"
          label={t('account:security.edit-password.old-password')}
          autoComplete="current-password"
          inputDescription={
            <ButtonLink type="button">Need a new password?</ButtonLink>
          }
        />
      )}

      <PasswordField
        controller={controllers.newPassword}
        id="edit-password-new-password"
        label={t('account:security.edit-password.new-password')}
        autoComplete="new-password"
      />

      <Form.Group>
        <PasswordCheckList
          passwordValidationResults={passwordValidationResults}
        />
      </Form.Group>

      <PasswordField
        controller={controllers.confirmNewPassword}
        id="edit-password-confirm-new-password"
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
