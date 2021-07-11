import Layout from '@layouts/Layout';
import { ButtonSimple } from '@ui/Button/Button';
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
    <StyledHeader className={className} tw="bg-white py-xl">
      <Layout.Container tw="flex items-center justify-between">
        <Logo />

        <LocationSearchBar tw="min-w-[20rem]" />

        <nav aria-label="Main" tw="flex gap-xs">
          <ButtonSimple rounded tw="font-semibold">
            Become a Host
          </ButtonSimple>

          <ButtonSimple rounded>
            <FaGlobe />
            <span tw="sr-only">Change site&apos; language</span>
          </ButtonSimple>

          <UserMenu />
        </nav>
      </Layout.Container>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px;
`;
export default HomeNavBar;
