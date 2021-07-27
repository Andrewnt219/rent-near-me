import DefaultLayout from '@layouts/DefaultLayout';
import AccountPageHeader from '@modules/account/AccountPageHeader/AccountPageHeader';
import useTranslation from 'next-translate/useTranslation';
import { ReactNode } from 'react';

export default function SecurityPage() {
  const { t } = useTranslation();

  return (
    <>
      <AccountPageHeader title={t('account:security.page-title')} />
    </>
  );
}

SecurityPage.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
