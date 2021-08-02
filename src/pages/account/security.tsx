import DefaultLayout from '@layouts/DefaultLayout';
import AccountInfoCard from '@modules/account/components/AccountInfoCard/AccountInfoCard';
import AccountPageHeader from '@modules/account/components/AccountPageHeader/AccountPageHeader';
import AccountPageLayout from '@modules/account/components/AccountPageLayout/AccountPageLayout';
import PasswordActionField from '@modules/account/components/PasswordActionField/PasswordActionField';
import useTranslation from 'next-translate/useTranslation';
import { ReactNode } from 'react';
import { FaUserShield } from 'react-icons/fa';

export default function SecurityPage() {
  return (
    <AccountPageLayout header={<Header />} main={<Main />} aside={<Aside />} />
  );
}

function Header() {
  const { t } = useTranslation();

  return <AccountPageHeader title={t('account:security.page-title')} />;
}

function Main() {
  return (
    <div>
      <PasswordActionField />
    </div>
  );
}

function Aside() {
  return (
    <AccountInfoCard
      title="Let's make your account more secure"
      icon={<FaUserShield />}
    >
      We’re always working on ways to increase safety in our community. That’s
      why we look at every account to make sure it’s as secure as possible.
    </AccountInfoCard>
  );
}

SecurityPage.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
