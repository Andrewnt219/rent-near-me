import DefaultLayout from '@layouts/DefaultLayout';
import AccountSettingsHeader from '@modules/account-settings/AccoutnSettingsHeader/AccoutnSettingsHeader';
import useTranslation from 'next-translate/useTranslation';
import { AppProps } from 'next/app';
import { FC } from 'react';

export default function LoginAndSecurityPage() {
  const { t } = useTranslation();

  return (
    <>
      <AccountSettingsHeader
        title={t('account-settings:routes.login-and-security')}
      />
    </>
  );
}

LoginAndSecurityPage.WithLayout = ((page: AppProps['Component']) => (
  <DefaultLayout>{page}</DefaultLayout>
)) as FC;
