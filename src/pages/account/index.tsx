import AccountMenu from '@modules/account/components/AccountMenu/AccountMenu';
import SettingsPageLayout from '@modules/account/layouts/SettingsPageLayout/SettingsPageLayout';
import { ButtonLink } from '@ui/Button/Button';
import SeparatorList from '@ui/SeparatorList/SeparatorList';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import React, { ReactNode } from 'react';

// TODO #55 fetch user info from session
const user = {
  name: 'Andrew Nguyen',
  email: 'phongnguyentuan20@gmail.com',
};

export default function AccountIndexPage() {
  const { t } = useTranslation();

  return (
    <section tw="max-w-5xl space-y-3xl md:space-y-4xl">
      <Header />

      <nav aria-label="Settings" tw="">
        <AccountMenu />
      </nav>

      <div tw="text-center">
        <p>{t('account:index.deactivate.title')}</p>

        <ButtonLink as="a" tw="font-semibold">
          {' '}
          {t('account:index.deactivate.button')}
        </ButtonLink>
      </div>
    </section>
  );
}

function Header() {
  const { t } = useTranslation();

  return (
    <header>
      <h1 tw="text-h2 font-semibold">{t('account:index.page-title')}</h1>

      <SeparatorList
        separator={<Separator />}
        tw="flex flex-col md:(flex-row gap-xs)"
      >
        <div title="Username" tw="font-semibold">
          {user.name}
        </div>

        <div title="Email" tw="break-words">
          {' '}
          {user.email}
        </div>

        <NextLink href="/account/profile-info" passHref>
          <ButtonLink tw="font-semibold" as="a">
            {t('account:index.go-to-profile')}
          </ButtonLink>
        </NextLink>
      </SeparatorList>
    </header>
  );
}

function Separator() {
  return <div tw="hidden md:(inline font-semibold) ">·</div>;
}
AccountIndexPage.getLayout = (page: ReactNode) => {
  return <SettingsPageLayout>{page}</SettingsPageLayout>;
};
