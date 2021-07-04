import Layout from '@layouts/Layout';
import Button from '@ui/Button/Button';
import LocationSearchBar from '@ui/LocationSearchBar/LocationSearchBar';
import Logo from '@ui/Logo/Logo';
import React from 'react';
import { FaGlobe } from 'react-icons/fa';
import UserMenu from '../UserMenu/UserMenu';

type Props = {
  className?: string;
};
const HomeNavBar = ({ className }: Props) => {
  return (
    <header className={className} tw="bg-white py-xl">
      <Layout.Container tw="flex items-center justify-between">
        <Logo />

        <LocationSearchBar tw="min-w-[20rem]" />

        <nav aria-label="Main" tw="flex space-x-sm">
          <Button tw="font-semibold">Become a Host</Button>

          <Button>
            <FaGlobe />
            <span tw="sr-only">Change site&apos; language</span>
          </Button>

          <UserMenu />
        </nav>
      </Layout.Container>
    </header>
  );
};

export default HomeNavBar;
