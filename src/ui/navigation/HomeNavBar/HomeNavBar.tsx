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
    <header className={className} tw="bg-white grid grid-cols-12">
      <div tw="flex grid-p-sm">
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
      </div>
    </header>
  );
};

export default HomeNavBar;
