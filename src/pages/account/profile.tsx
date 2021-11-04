import { ReactNode } from 'react';
import useTranslation from 'next-translate/useTranslation';

import AccountPageHeader from '@modules/account/components/AccountPageHeader/AccountPageHeader';
import AccountSettingLayout from '@modules/account/layouts/AccountSettingLayout/AccountSettingLayout';
import AccountPageLayout from '@modules/account/layouts/AccountPageLayout/AccountPageLayout';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';

export default function PersonalInfoPage() {
  const { t } = useTranslation();
  const { profile } = useAuth();

  return (
    <section>
      <AccountPageHeader title={t('account:personal-info.page-title')} />
      <p>
        {profile?.firstName} {profile?.lastName}
      </p>
      <p>{profile?.gender}</p>
      {/* <AccountSettingLayout main={<Main />} aside={<Aside />} /> */}
    </section>
  );
}

PersonalInfoPage.getLayout = (page: ReactNode) => (
  <AccountPageLayout>{page}</AccountPageLayout>
);
