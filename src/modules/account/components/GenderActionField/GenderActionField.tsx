import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import ToggleActionField from '@modules/account/components/ActionField/ToggleActionField';
import useUserProfile from '@modules/user-auth/hooks/useUserProfile';
import { GENDERS } from '@models/constnats';
import ChangeGenderForm from '../ChangeGenderForm/ChangeGenderForm';

const GenderActionField: VFC = () => {
  const { t } = useTranslation();

  return (
    <ToggleActionField
      label={t('account:personal-info.change-gender.field-label')}
      mainContent={<ChangeGenderForm />}
      alternativeContent={<GenderActionFieldAltContent />}
    />
  );
};

export default GenderActionField;

const GenderActionFieldAltContent: VFC = () => {
  const { t } = useTranslation();
  const { profile } = useUserProfile();
  return (
    <>
      {GENDERS[profile?.gender ?? ''] ??
        t('account:personal-info.change-gender.description.no-data')}
    </>
  );
};
