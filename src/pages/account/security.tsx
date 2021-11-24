import { CustomNextPage } from '@/next';
import useTranslation from 'next-translate/useTranslation';
import AccountInfoCard from '@modules/account/components/AccountInfoCard/AccountInfoCard';
import AccountInfoCardGroup from '@modules/account/components/AccountInfoCard/AccountInfoCardGroup';
import AccountPageHeader from '@modules/account/components/AccountPageHeader/AccountPageHeader';
import ActionFieldGroup from '@modules/account/components/ActionField/ActionFieldGroup';
import PasswordActionField from '@modules/account/components/PasswordActionField/PasswordActionField';
import AccountSettingLayout from '@modules/account/layouts/AccountSettingLayout/AccountSettingLayout';
import AccountPageLayout from '@modules/account/layouts/AccountPageLayout/AccountPageLayout';
import EmailActionField from '@modules/account/components/EmailActionField/EmailActionField';
import useUserProfile from '@modules/user-auth/hooks/useUserProfile';
import Text from '@ui/Text/Text';
import LoadingIndicator from '@ui/LoadingIndicator';
import { TabGroup, Tab } from '@ui/Tab';
import { Icon } from '@iconify/react';
import shieldFill from '@iconify/icons-eva/shield-fill';

const AccountSecurityPage: CustomNextPage = () => {
  const { t } = useTranslation();

  return (
    <section>
      <AccountPageHeader title={t('account:security.page-title')} />

      <AccountSettingLayout main={<Main />} aside={<Aside />} />
    </section>
  );
};

function Main() {
  const { t } = useTranslation();
  const { isProfileReady } = useUserProfile();
  return isProfileReady ? (
    <TabGroup buttonGap="lg" theme="secondary">
      <Tab label={t('account:security.login-title')}>
        <ActionFieldGroup>
          <EmailActionField />
          <PasswordActionField />
        </ActionFieldGroup>
      </Tab>
      <Tab label={t('account:security.social-account-title')}>
        Tab 2 content
      </Tab>
      <Tab label={t('account:security.history-title')}>Tab 3 content</Tab>
    </TabGroup>
  ) : (
    <div tw="grid place-items-center h-full">
      <LoadingIndicator variant="FlashingThreeDots" theme="secondary" />
    </div>
  );
}

function Aside() {
  return (
    <AccountInfoCardGroup tw="md:pt-xl">
      <AccountInfoCard
        title="Let's make your account more secure"
        icon={<Icon icon={shieldFill} tw="text-secondary" />}
      >
        We’re always working on ways to increase safety in our community. That’s
        why we look at every account to make sure it’s as secure as possible.
      </AccountInfoCard>
    </AccountInfoCardGroup>
  );
}

AccountSecurityPage.getLayout = AccountPageLayout.getLayout;

export default AccountSecurityPage;
