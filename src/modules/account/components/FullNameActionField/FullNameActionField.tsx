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
  const { profile } = useUserProfile();
  return (
    <>
      {!profile?.firstName || !profile?.lastName
        ? t('account:personal-info.change-name.description.no-data')
        : `${profile.firstName} ${profile.lastName}`}
    </>
  );
};

export default FullNameActionField;
