import Layout from '@layouts/Layout';
import Button from '@ui/Button/Button';
import LocationSearchBar from '@ui/LocationSearchBar/LocationSearchBar';
import Logo from '@ui/Logo/Logo';
import React from 'react';
import { FaGlobe } from 'react-icons/fa';
import { styled } from 'twin.macro';
import UserMenu from '../UserMenu/UserMenu';

type Props = {
  className?: string;
};
const HomeNavBar = ({ className }: Props) => {
  return (
    <header className={className} tw="bg-white">
      <Layout.Container tw="flex">
        <Logo />

        <LocationSearchBar />

        <nav aria-label="Main">
          <Button>Become a Host</Button>

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

const StyledWrapper = styled.div``;

export default HomeNavBar;
