import { useAuth } from '@contexts/AuthContext';
import { useLayoutModal } from '@contexts/LayoutModalContext';
import Layout from '@layouts/Layout';
import { ButtonGhost } from '@ui/Button/Button';
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
  const { isAuthenticated } = useAuth();
  const { registerModal } = useLayoutModal();

  return (
    <StyledHeader className={className} tw="bg-white py-xl">
      <Layout.Container tw="flex items-center justify-between">
        <Logo />

        <LocationSearchBar tw="min-w-[20rem]" />

        <nav aria-label="Main" tw="flex gap-xs">
          {!isAuthenticated && (
            <ButtonGhost
              onClick={registerModal.show}
              circle
              size="md"
              tw="font-semibold"
            >
              Become a Host
            </ButtonGhost>
          )}

          <ButtonGhost size="md" circle>
            <FaGlobe />
            <span tw="sr-only">Change site&apos; language</span>
          </ButtonGhost>

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
