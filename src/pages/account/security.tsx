import AccountInfoCard from '@modules/account/components/AccountInfoCard/AccountInfoCard';
import AccountInfoCardGroup from '@modules/account/components/AccountInfoCardGroup/AccountInfoCardGroup';
import AccountPageHeader from '@modules/account/components/AccountPageHeader/AccountPageHeader';
import ActionFieldGroup from '@modules/account/components/ActionFieldGroup/ActionFieldGroup';
import PasswordActionField from '@modules/account/components/PasswordActionField/PasswordActionField';
import AccountSettingLayout from '@modules/account/layouts/AccountSettingLayout/AccountSettingLayout';
import SettingsPageLayout from '@modules/account/layouts/SettingsPageLayout/SettingsPageLayout';
import useTranslation from 'next-translate/useTranslation';
import { ReactNode } from 'react';
import { FaShieldAlt } from 'react-icons/fa';

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
        icon={<FaShieldAlt tw=" text-secondary" />}
      >
        We’re always working on ways to increase safety in our community. That’s
        why we look at every account to make sure it’s as secure as possible.
      </AccountInfoCard>
      <AccountInfoCard
        title="Let's make your account more secure"
        icon={<FaShieldAlt tw=" text-secondary" />}
      >
        We’re always working on ways to increase safety in our community. That’s
        why we look at every account to make sure it’s as secure as possible.
      </AccountInfoCard>
    </AccountInfoCardGroup>
  );
}

SecurityPage.getLayout = (page: ReactNode) => {
  return <SettingsPageLayout>{page}</SettingsPageLayout>;
};
