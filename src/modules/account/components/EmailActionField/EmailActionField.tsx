import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import ToggleActionField from '@modules/account/components/ActionField/ToggleActionField';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import Text from '@ui/Text/Text';
import { ButtonLink } from '@ui/Button/Button';
import AuthApi from '@services/AuthApi';
import { useSnackbar } from '@ui/Snackbar/SnackbarContext';
import { getErrorMessage } from '@utils/api-responses';

const EmailActionField: VFC = () => {
  const { t } = useTranslation();

  return (
    <ToggleActionField
      label={t('account:security.email.field-label')}
      showActionButton={false}
      alternativeContent={<EmailActionFieldAltContent />}
    />
  );
};

export default EmailActionField;

const EmailActionFieldAltContent: VFC = () => {
  const { user } = useAuth();

  return (
    <>
      <Text tw="mb-sm">{user?.email}</Text>
      {!user?.emailVerified && <EmailUnverifiedAlert />}
    </>
  );
};

const EmailUnverifiedAlert: VFC = () => {
  const { t } = useTranslation();
  const snackbar = useSnackbar();

  const onSendEmailVerificationClick = async () => {
    try {
      await AuthApi.sendEmailVerification();
      snackbar.showSnackSuccess(
        t(
          'account:security.email.description.emailUnverifiedAlert.message.success'
        )
      );
    } catch (e) {
      snackbar.showSnackError(getErrorMessage(e, t));
    }
  };

  return (
    // TODO(vito): Use a warning alert here when the component is built
    <div>
      <Text>
        <span tw="font-bold">{t('common:fields.alert.warning')}</span>:{' '}
        {t('account:security.email.description.emailUnverifiedAlert.line1')}
      </Text>
      <Text variant="body2">
        {t('account:security.email.description.emailUnverifiedAlert.line2')}
      </Text>
      <Text variant="body2">
        <ButtonLink onClick={onSendEmailVerificationClick}>
          {t('account:security.email.description.emailUnverifiedAlert.line3')}
        </ButtonLink>
      </Text>
    </div>
  );
};
