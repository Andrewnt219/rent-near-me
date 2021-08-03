import { ButtonLink, ButtonSecondary } from '@ui/Button/Button';
import Form from '@ui/Form';
import PasswordCheckList from '@ui/PasswordCheckList/PasswordCheckList';
import PasswordField from '@ui/PasswordField';
import useTranslation from 'next-translate/useTranslation';
import { useEditPasswordForm } from './useEditPasswordForm';

type Props = {
  className?: string;
};
function EditPasswordForm({ className, ...props }: Props) {
  const { t } = useTranslation();
  const {
    form,
    controllers,
    onSubmit,
    passwordValidationResults,
  } = useEditPasswordForm();

  return (
    <Form className={className} tw="" onSubmit={onSubmit}>
      <PasswordField
        controller={controllers.oldPassword}
        id="edit-password-old-password"
        label={t('account:security.edit-password.old-password')}
        autoComplete="current-password"
        inputDescription={
          <ButtonLink type="button">Need a new password?</ButtonLink>
        }
      />

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

      <ButtonSecondary size="lg">Update Password</ButtonSecondary>
    </Form>
  );
}

export default EditPasswordForm;
