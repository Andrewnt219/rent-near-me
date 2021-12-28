import React from 'react';
import { Link } from '@ui/Button/Link';
import { useModals } from '@ui/Modal/ModalContext';
import LogoWithName from '@ui/Logo/LogoWithName';
import LocationSearchBar from '@ui/LocationSearchBar/LocationSearchBar';
import Layout from '@modules/layouts/Layout';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import UserMenu from '../UserMenu/UserMenu';
import LanguageMenu from '../LanguageMenu/LanguageMenu';
import { Button } from '@ui/Button';

type Props = {
  className?: string;
};
const HomeNavBar = ({ className }: Props) => {
  const { isAuthenticated } = useAuth();
  const { registerModal } = useModals();

  return (
    <header className={className} tw="z-10 bg-white py-lg shadow">
      <Layout.Container tw="flex items-center justify-between">
        <Link href="/">
          <LogoWithName />
        </Link>

        <LocationSearchBar tw="min-w-[20rem]" />

        <nav aria-label="Main" tw="flex items-center gap-md">
          {!isAuthenticated && (
            <Button
              onClick={registerModal?.show}
              rounded
              variant="primary"
              size="md"
              tw="font-semibold mr-md"
            >
              Join our community
            </Button>
          )}

          <LanguageMenu />
          <UserMenu />
        </nav>
      </Layout.Container>
    </header>
  );
};

export default HomeNavBar;
