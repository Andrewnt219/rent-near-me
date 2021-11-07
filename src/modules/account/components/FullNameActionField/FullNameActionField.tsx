import React, { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import ToggleActionField from '../ActionField/ToggleActionField';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import ChangeFullNameForm from '../ChangeFullNameForm/ChangeFullNameForm';

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
  const { isAuthReady, profile } = useAuth();
  return (
    <>
      {isAuthReady &&
        (!profile?.firstName || !profile?.lastName
          ? t('account:personal-info.change-name.description.no-name')
          : `${profile.firstName} ${profile.lastName}`)}
    </>
  );
};

export default FullNameActionField;
