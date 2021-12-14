import React from 'react';
import { LinkBase } from '@ui/Button/Link';
import { ButtonPrimary } from '@ui/Button';
import { useModals } from '@ui/Modal/ModalContext';
import LogoWithName from '@ui/Logo/LogoWithName';
import LocationSearchBar from '@ui/LocationSearchBar/LocationSearchBar';
import Layout from '@modules/layouts/Layout';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import UserMenu from '../UserMenu/UserMenu';
import LanguageMenu from '../LanguageMenu/LanguageMenu';

type Props = {
  className?: string;
};
const HomeNavBar = ({ className }: Props) => {
  const { isAuthenticated } = useAuth();
  const { registerModal } = useModals();

  return (
    <header className={className} tw="z-10 bg-white py-lg shadow">
      <Layout.Container tw="flex items-center justify-between">
        <LinkBase href="/">
          <LogoWithName />
        </LinkBase>

        <LocationSearchBar tw="min-w-[20rem]" />

        <nav aria-label="Main" tw="flex items-center gap-md">
          {!isAuthenticated && (
            <ButtonPrimary
              onClick={registerModal?.show}
              rounded
              size="md"
              tw="font-semibold mr-md"
            >
              Join our community
            </ButtonPrimary>
          )}

          <LanguageMenu />
          <UserMenu />
        </nav>
      </Layout.Container>
    </header>
  );
};

export default HomeNavBar;
