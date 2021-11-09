import React, { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import ToggleActionField from '../ActionField/ToggleActionField';
import { useUserProfile } from '@modules/user-auth/hooks/useUserProfile';
import dayjs from 'dayjs';
import { DATE_TIME_FORMATS } from '@models/constnats';
import ChangeDobForm from '../ChangeDobForm/ChangeDobForm';

const DobActionField: VFC = () => {
  const { t } = useTranslation();

  return (
    <ToggleActionField
      label={t('account:personal-info.change-dob.field-label')}
      mainContent={<ChangeDobForm />}
      alternativeContent={<DobActionFieldAltContent />}
    />
  );
};

const DobActionFieldAltContent: VFC = () => {
  const { t } = useTranslation();
  const { isProfileReady, profile } = useUserProfile();
  return (
    <>
      {isProfileReady &&
        (profile?.dob
          ? dayjs(profile.dob).format(DATE_TIME_FORMATS.LONG_DATE_TEXT)
          : t('account:personal-info.change-dob.description.no-data'))}
    </>
  );
};

export default DobActionField;
