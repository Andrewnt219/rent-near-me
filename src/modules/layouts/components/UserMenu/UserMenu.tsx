import { RouteProps } from '@common-types';
import { Icon } from '@iconify/react';
import { useLayoutModal } from '@modules/layouts/contexts/LayoutModalContext';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import AuthService from '@services/AuthService';
import { ButtonGhost } from '@ui/Button/Button';
import { HTMLAttributes } from 'react';
import tw, { styled } from 'twin.macro';
import { StyledUserMenuLink } from '../UserMenuLink/UserMenuLink';
import UserMenuLinksGroup from '../UserMenuLinksGroup/UserMenuLinksGroup';
import { useUserMenuDropDown } from './useUserMenuDropdown';
type Props = {
  className?: string;
};
const UserMenu = ({ className }: Props) => {
  const { isOpen, wrapperRef, closeDropdown, openDropdown, toggleDropDown } =
    useUserMenuDropDown();

  return (
    <div tw="relative" ref={wrapperRef}>
      <ButtonGhost
        className={className}
        id="user-menu-button"
        aria-haspopup
        aria-controls="user-menu-menu"
        aria-expanded={isOpen}
        aria-pressed={isOpen}
        onClick={toggleDropDown}
        circle
        tw="flex items-center border pl-md pr-sm py-sm transition-shadow hover:shadow"
      >
        <span tw="sr-only">Menu</span>

        <HamburgerIcon />

        <Icon icon="mdi:account-circle" tw="w-8 h-8 p-xs rounded-full ml-sm" />
      </ButtonGhost>
      {isOpen && <Menu onBlur={closeDropdown} onFocus={openDropdown} />}
    </div>
  );
};
/* -------------------------------- Hamburger ------------------------------- */
function HamburgerIcon() {
  return (
    <div tw="inline-flex flex-col justify-center space-y-0.5 h-full">
      <StyledLine />
      <StyledLine />
      <StyledLine />
    </div>
  );
}

const StyledLine = styled.div`
  ${tw`h-0.5 w-5 bg-dark`}
`;

/* ---------------------------------- Menu ---------------------------------- */
const links: Record<string, RouteProps[]> = {
  account: [
    {
      textTranslateKey: 'account.index',
      href: '/account',
    },
  ],
  preference: [
    {
      textTranslateKey: 'home',
      href: '/',
    },
    {
      textTranslateKey: 'account.security',
      href: '/account/security',
    },
    {
      textTranslateKey: 'wishlist',
      href: '/wishlist',
    },
  ],
};

type MenuProps = HTMLAttributes<HTMLUListElement>;
function Menu(props: MenuProps) {
  const { isAuthenticated } = useAuth();
  const { registerModal, loginModal } = useLayoutModal();

  return (
    <ul
      {...props}
      id="user-menu-menu"
      role="menu"
      aria-label="Menu links"
      tw="font-normal absolute top-[125%] right-0 bg-white min-w-[12.5rem] shadow rounded z-40"
    >
      {isAuthenticated ? (
        <UserMenuLinksGroup routes={links['account']} />
      ) : (
        <UserMenuLinksGroup tw="font-semibold">
          <StyledUserMenuLink as="button" onClick={registerModal?.show}>
            Register
          </StyledUserMenuLink>

          <StyledUserMenuLink as="button" onClick={loginModal?.show}>
            Login
          </StyledUserMenuLink>
        </UserMenuLinksGroup>
      )}
      <UserMenuLinksGroup routes={links['preference']} />
      {isAuthenticated && (
        <UserMenuLinksGroup>
          <StyledUserMenuLink
            tw="text-danger"
            as="button"
            onClick={AuthService.signOut}
          >
            Logout
          </StyledUserMenuLink>
        </UserMenuLinksGroup>
      )}
    </ul>
  );
}

export default UserMenu;
