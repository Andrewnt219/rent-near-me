import React, { ReactNode, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Icon } from '@iconify/react';
import shieldFill from '@iconify/icons-eva/shield-fill';
import AccountPageHeader from '@modules/account/components/AccountPageHeader/AccountPageHeader';
import AccountSettingLayout from '@modules/account/layouts/AccountSettingLayout/AccountSettingLayout';
import AccountPageLayout from '@modules/account/layouts/AccountPageLayout/AccountPageLayout';
import AccountInfoCard from '@modules/account/components/AccountInfoCard/AccountInfoCard';
import AccountInfoCardGroup from '@modules/account/components/AccountInfoCard/AccountInfoCardGroup';
import ActionFieldGroup from '@modules/account/components/ActionField/ActionFieldGroup';
import FullNameActionField from '@modules/account/components/FullNameActionField/FullNameActionField';
import GenderActionField from '@modules/account/components/GenderActionField/GenderActionField';
import DobActionField from '@modules/account/components/DobActionField/DobActionField';

export default function AccountPersonalInfoPage() {
  const { t } = useTranslation();

  return (
    <section>
      <AccountPageHeader title={t('account:personal-info.page-title')} />

      <AccountSettingLayout main={<Main />} aside={<Aside />} />
    </section>
  );
}

const Main: VFC = () => (
  <ActionFieldGroup>
    <FullNameActionField />
    <GenderActionField />
    <DobActionField />
  </ActionFieldGroup>
);

const Aside: VFC = () => {
  return (
    <AccountInfoCardGroup>
      <AccountInfoCard
        title="Which details can be edited?"
        icon={<Icon icon={shieldFill} tw=" text-secondary" />}
      >
        Details Airbnb uses to verify your identity can’t be changed. Contact
        info and some personal details can be edited, but we may ask you verify
        your identity the next time you book or create a listing.
      </AccountInfoCard>
      <AccountInfoCard
        title="What info is shared with others?"
        icon={<Icon icon={shieldFill} tw=" text-secondary" />}
      >
        Airbnb only releases contact information for hosts and guests after a
        reservation is confirmed.
      </AccountInfoCard>
    </AccountInfoCardGroup>
  );
};

AccountPersonalInfoPage.getLayout = (page: ReactNode) => (
  <AccountPageLayout>{page}</AccountPageLayout>
);
