import AccountInfoCard from '@modules/account/components/AccountInfoCard/AccountInfoCard';
import AccountInfoCardGroup from '@modules/account/components/AccountInfoCard/AccountInfoCardGroup';
import AccountPageHeader from '@modules/account/components/AccountPageHeader/AccountPageHeader';
import ActionFieldGroup from '@modules/account/components/ActionField/ActionFieldGroup';
import PasswordActionField from '@modules/account/components/PasswordActionField/PasswordActionField';
import AccountPageLayout from '@modules/account/layouts/AccountPageLayout/AccountPageLayout';
import AccountSettingLayout from '@modules/account/layouts/AccountSettingLayout/AccountSettingLayout';
import useTranslation from 'next-translate/useTranslation';
import { ReactNode } from 'react';
import { Icon } from '@iconify/react';
import shieldFill from '@iconify/icons-eva/shield-fill';
export default function SecurityPage() {
  const { t } = useTranslation();

  return (
    <section>
      <AccountPageHeader title={t('account:security.page-title')} />

      <AccountSettingLayout main={<Main />} aside={<Aside />} />
    </section>
  );
}

function Main() {
  return (
    <ActionFieldGroup>
      <PasswordActionField />
    </ActionFieldGroup>
  );
}

function Aside() {
  return (
    <AccountInfoCardGroup>
      <AccountInfoCard
        title="Let's make your account more secure"
        icon={<Icon icon={shieldFill} tw=" text-secondary" />}
      >
        We’re always working on ways to increase safety in our community. That’s
        why we look at every account to make sure it’s as secure as possible.
      </AccountInfoCard>
      <AccountInfoCard
        title="Let's make your account more secure"
        icon={<Icon icon={shieldFill} tw=" text-secondary" />}
      >
        We’re always working on ways to increase safety in our community. That’s
        why we look at every account to make sure it’s as secure as possible.
      </AccountInfoCard>
    </AccountInfoCardGroup>
  );
}

SecurityPage.getLayout = (page: ReactNode) => {
  return <AccountPageLayout>{page}</AccountPageLayout>;
};
