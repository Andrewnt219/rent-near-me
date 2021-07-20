import DefaultLayout from '@layouts/DefaultLayout';
import AccountSettingsHeader from '@modules/account-settings/AccoutnSettingsHeader/AccoutnSettingsHeader';
import useTranslation from 'next-translate/useTranslation';

export default function LoginAndSecurityPage() {
  const { t } = useTranslation();

  return (
    <>
      <AccountSettingsHeader
        title={t('account-settings:login-and-security.page-title')}
      />
    </>
  );
}

LoginAndSecurityPage.WithLayout = DefaultLayout.Layout;
