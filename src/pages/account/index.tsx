import { CustomNextPage } from '@/next';
import AccountMenu from '@modules/account/components/AccountMenu/AccountMenu';
import AccountPageLayout from '@modules/account/layouts/AccountPageLayout/AccountPageLayout';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import { Button } from '@ui/Button';
import { Link } from '@ui/Button/Link';
import SeparatorList from '@ui/SeparatorList/SeparatorList';
import Text from '@ui/Text/Text';
import useTranslation from 'next-translate/useTranslation';

const AccountIndexPage: CustomNextPage = () => {
  const { t } = useTranslation();

  return (
    <section tw="max-w-5xl space-y-xl md:space-y-xl">
      <Header />

      <nav aria-label="Settings" tw="">
        <AccountMenu />
      </nav>

      <div tw="text-center">
        <p>{t('account:index.deactivate.title')}</p>

        <Button variant="link" tw="font-semibold">
          {t('account:index.deactivate.button')}
        </Button>
      </div>
    </section>
  );
};

function Header() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <header>
      <Text component="h1" variant="h2">
        {t('account:index.page-title')}
      </Text>

      <SeparatorList
        separator={<Separator />}
        tw="flex flex-col md:(flex-row gap-xs)"
      >
        <div title="Username" tw="font-semibold">
          {user?.displayName}
        </div>

        <div title="Email" tw="break-words">
          {user?.email}
        </div>

        <Link variant="link" href="/account/profile" tw="font-semibold">
          {t('account:index.go-to-profile')}
        </Link>
      </SeparatorList>
    </header>
  );
}

function Separator() {
  return <div tw="hidden md:(inline font-semibold) ">·</div>;
}

AccountIndexPage.getLayout = AccountPageLayout.getLayout;

export default AccountIndexPage;
