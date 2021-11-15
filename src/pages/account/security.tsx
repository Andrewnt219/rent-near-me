import AccountInfoCard from '@modules/account/components/AccountInfoCard/AccountInfoCard';
import AccountInfoCardGroup from '@modules/account/components/AccountInfoCard/AccountInfoCardGroup';
import AccountPageHeader from '@modules/account/components/AccountPageHeader/AccountPageHeader';
import ActionFieldGroup from '@modules/account/components/ActionField/ActionFieldGroup';
import PasswordActionField from '@modules/account/components/PasswordActionField/PasswordActionField';
import AccountPageLayout, {
  getAccountPageLayout,
} from '@modules/account/layouts/AccountPageLayout/AccountPageLayout';
import AccountSettingLayout from '@modules/account/layouts/AccountSettingLayout/AccountSettingLayout';
import useTranslation from 'next-translate/useTranslation';
import React, { ReactNode } from 'react';
import { Icon } from '@iconify/react';
import shieldFill from '@iconify/icons-eva/shield-fill';
import EmailActionField from '@modules/account/components/EmailActionField/EmailActionField';
import Text from '@ui/Text/Text';
import { useUserProfile } from '@modules/user-auth/hooks/useUserProfile';
import LoadingIndicator from '@ui/LoadingIndicator';

export default function AccountSecurityPage() {
  const { t } = useTranslation();

  return (
    <section>
      <AccountPageHeader title={t('account:security.page-title')} />

      <AccountSettingLayout main={<Main />} aside={<Aside />} />
    </section>
  );
}

function Main() {
  const { t } = useTranslation();
  const { isProfileReady } = useUserProfile();
  return isProfileReady ? (
    <div>
      <Text component="h2" variant="h3" tw="mb-lg">
        {t('account:security.login-title')}
      </Text>
      <ActionFieldGroup>
        <EmailActionField />
        <PasswordActionField />
      </ActionFieldGroup>
    </div>
  ) : (
    <div tw="grid place-items-center h-full">
      <LoadingIndicator variant="FlashingThreeDots" theme="secondary" />
    </div>
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
    </AccountInfoCardGroup>
  );
}

AccountSecurityPage.getLayout = getAccountPageLayout;
