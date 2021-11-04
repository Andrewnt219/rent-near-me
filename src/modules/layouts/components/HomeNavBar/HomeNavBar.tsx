import { useLayoutModal } from '@modules/layouts/contexts/LayoutModalContext';
import Layout from '@modules/layouts/Layout';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import { ButtonGhost } from '@ui/Button/Button';
import { IconButtonGhost } from '@ui/IconButton/IconButton';
import LocationSearchBar from '@ui/LocationSearchBar/LocationSearchBar';
import Logo from '@ui/Logo/Logo';
import Link from 'next/link';
import React from 'react';
import { MdLanguage } from 'react-icons/md';
import { styled } from 'twin.macro';
import UserMenu from '../UserMenu/UserMenu';

type Props = {
  className?: string;
};
const HomeNavBar = ({ className }: Props) => {
  const { isAuthenticated } = useAuth();
  const { registerModal } = useLayoutModal();

  return (
    <header className={className} tw="bg-white py-lg shadow">
      <Layout.Container tw="flex items-center justify-between">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>

        <LocationSearchBar tw="min-w-[20rem]" />

        <nav aria-label="Main" tw="flex items-center">
          {!isAuthenticated && (
            <ButtonGhost
              onClick={registerModal?.show}
              circle
              size="md"
              tw="font-semibold"
            >
              Become a Host
            </ButtonGhost>
          )}

          <IconButtonGhost size="md">
            <MdLanguage />
            <span tw="sr-only">Change site&apos; language</span>
          </IconButtonGhost>

          <UserMenu tw="ml-sm" />
        </nav>
      </Layout.Container>
    </header>
  );
};

const StyledHeader = styled.header``;
export default HomeNavBar;
