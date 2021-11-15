import { VFC } from 'react';
import dayjs from 'dayjs';
import useTranslation from 'next-translate/useTranslation';
import ToggleActionField from '@modules/account/components/ActionField/ToggleActionField';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import { useUserProfile } from '@modules/user-auth/hooks/useUserProfile';

const PasswordActionField: VFC = () => {
  const { t } = useTranslation();

  return (
    <ToggleActionField
      label={t('account:security.change-password.field-label')}
      mainContent={<ChangePasswordForm />}
      alternativeContent={<PasswordActionFieldAltContent />}
    />
  );
};

export default PasswordActionField;

const PasswordActionFieldAltContent: VFC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { profile } = useUserProfile();

  return (
    <>
      {profile?.passwordLastUpdatedTime
        ? t('account:security.change-password.description.password-changed', {
            time: dayjs(profile.passwordLastUpdatedTime).fromNow(),
          })
        : t('account:security.change-password.description.password-unchanged', {
            time: dayjs(user?.metadata.creationTime).fromNow(),
          })}
    </>
  );
};
