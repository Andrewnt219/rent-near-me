import React, { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import ToggleActionField from '../ActionField/ToggleActionField';
import ChangeFullNameForm from '../ChangeFullNameForm/ChangeFullNameForm';
import { useUserProfile } from '@modules/user-auth/hooks/useUserProfile';

const FullNameActionField: VFC = () => {
  const { t } = useTranslation();

  return (
    <ToggleActionField
      label={t('account:personal-info.change-name.field-label')}
      mainContent={<ChangeFullNameForm />}
      alternativeContent={<FullNameActionFieldAltContent />}
    />
  );
};

const FullNameActionFieldAltContent: VFC = () => {
  const { t } = useTranslation();
  const { isProfileReady, profile } = useUserProfile();
  return (
    <>
      {isProfileReady &&
        (!profile?.firstName || !profile?.lastName
          ? t('account:personal-info.change-name.description.no-name')
          : `${profile.firstName} ${profile.lastName}`)}
    </>
  );
};

export default FullNameActionField;
