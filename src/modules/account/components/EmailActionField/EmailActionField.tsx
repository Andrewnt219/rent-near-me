import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import ToggleActionField from '@modules/account/components/ActionField/ToggleActionField';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import Text from '@ui/Text/Text';
import SendEmailVerificationButton from '../SendEmailVerificationButton/SendEmailVerificationButton';

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
  return (
    // TODO(vito): Use a warning alert here when the component is built
    <div>
      <Text variant="body1">
        <Text variant="sub1" component="span">
          {t('common:fields.alert.warning')}:
        </Text>{' '}
        {t('account:security.email.description.emailUnverifiedAlert.line1')}
      </Text>
      <Text variant="body2">
        {t('account:security.email.description.emailUnverifiedAlert.line2')}
      </Text>
      <Text variant="body2">
        <SendEmailVerificationButton />
      </Text>
    </div>
  );
};
