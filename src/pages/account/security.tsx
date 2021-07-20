import DefaultLayout from '@layouts/DefaultLayout';
import AccountPageHeader from '@modules/account/AccountPageHeader/AccountPageHeader';
import useTranslation from 'next-translate/useTranslation';

export default function SecurityPage() {
  const { t } = useTranslation();

  return (
    <>
      <AccountPageHeader title={t('account:security.page-title')} />
    </>
  );
}

SecurityPage.WithLayout = DefaultLayout.Layout;
