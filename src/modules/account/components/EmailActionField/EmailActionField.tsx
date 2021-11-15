import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import ToggleActionField from '@modules/account/components/ActionField/ToggleActionField';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';

const EmailActionField: VFC = () => {
  const { t } = useTranslation();

  return (
    <ToggleActionField
      label={t('account:security.change-email.field-label')}
      showActionButton={false}
      alternativeContent={<EmailActionFieldAltContent />}
    />
  );
};

export default EmailActionField;

const EmailActionFieldAltContent: VFC = () => {
  const { user } = useAuth();

  return <>{user?.email}</>;
};
