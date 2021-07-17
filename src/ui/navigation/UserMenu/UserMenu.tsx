import { RouteProps } from '@common-types';
import { useLayoutModal } from '@layouts/LayoutModalContext';
import { ButtonSimple } from '@ui/Button/Button';
import { HTMLAttributes } from 'react';
import { FaUserAlt } from 'react-icons/fa';
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
      <ButtonSimple
        className={className}
        id="user-menu-button"
        aria-haspopup
        aria-controls="user-menu-menu"
        aria-expanded={isOpen}
        aria-pressed={isOpen}
        onClick={toggleDropDown}
        tw="flex items-center border rounded-full pl-md pr-sm py-sm transition-shadow hover:shadow"
      >
        <span tw="sr-only">Menu</span>

        <HamburgerIcon />

        <FaUserAlt tw="h-7 w-7 p-xs bg-gray rounded-full text-white ml-md" />
      </ButtonSimple>
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
const links: Record<'preference', RouteProps[]> = {
  preference: [
    {
      textTranslateKey: 'home',
      href: '/',
    },
    {
      textTranslateKey: 'about',
      href: '/about',
    },
    {
      textTranslateKey: 'wishlist',
      href: '/wishlist',
    },
  ],
};

type MenuProps = HTMLAttributes<HTMLUListElement>;
function Menu(props: MenuProps) {
  const { registerModal, loginModal } = useLayoutModal();

  return (
    <ul
      {...props}
      id="user-menu-menu"
      role="menu"
      aria-label="Menu links"
      tw="font-normal absolute top-[125%] right-0 bg-white min-w-[12.5rem] shadow rounded z-40"
    >
      <UserMenuLinksGroup tw="font-semibold">
        <StyledUserMenuLink as="button" onClick={registerModal.show}>
          Register
        </StyledUserMenuLink>

        <StyledUserMenuLink as="button" onClick={loginModal.show}>
          Login
        </StyledUserMenuLink>
      </UserMenuLinksGroup>

      <UserMenuLinksGroup routes={links.preference} />
    </ul>
  );
}

export default UserMenu;
