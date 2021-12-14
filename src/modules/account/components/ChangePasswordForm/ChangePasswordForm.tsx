import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import { ButtonSecondary } from '@ui/Button';
import Form from '@ui/Form/Form';
import HiddenField from '@ui/Form/HiddenField';
import PasswordField from '@ui/Form/PasswordField';
import PasswordCheckList from '@ui/PasswordCheckList/PasswordCheckList';
import useTranslation from 'next-translate/useTranslation';
import ForgetPasswordButton from '../ForgetPasswordButton/ForgetPasswordButton';
import useChangePasswordForm from './useChangePasswordForm';

function ChangePasswordForm() {
  const { t } = useTranslation();
  const { form, onSubmit, passwordValidationResults } = useChangePasswordForm();
  const { effectiveProvider } = useAuth();

  return (
    <Form form={form} noValidate onSubmit={onSubmit}>
      <HiddenField name="email" autoComplete="username" hiddenVisually />

      {effectiveProvider === 'password' && (
        <PasswordField
          name="oldPassword"
          label={t('account:security.change-password.old-password')}
          autoComplete="current-password"
          inputDescription={<ForgetPasswordButton type="button" />}
        />
      )}

      <PasswordField
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
        name="confirmNewPassword"
        label={t('account:security.change-password.confirm-new-password')}
        autoComplete="new-password"
      />

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
