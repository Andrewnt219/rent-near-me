import { RouteProps } from '@common-types';
import { ButtonSimple } from '@ui/Button/Button';
import { HTMLAttributes } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import tw, { styled } from 'twin.macro';
import UserMenuLink from '../UserMenuLink/UserMenuLink';
import UserMenuLinksGroup from '../UserMenuLinksGroup/UserMenuLinksGroup';
import { useUserMenuDropDown } from './useUserMenuDropdown';

type Props = {
  className?: string;
};
const UserMenu = ({ className }: Props) => {
  const { isOpen, buttonRef, closeDropdown, openDropdown, toggleDropDown } =
    useUserMenuDropDown();

  return (
    <ButtonSimple
      ref={buttonRef}
      className={className}
      id="user-menu-button"
      aria-haspopup
      aria-controls="user-menu-menu"
      aria-expanded={isOpen}
      aria-pressed={isOpen}
      onClick={toggleDropDown}
      tw="flex border text-left relative rounded-full pl-md pr-sm py-sm transition-shadow hover:shadow"
    >
      <span tw="sr-only">Menu</span>

      <StyledHamburger />

      <FaUserAlt tw="h-7 w-7 p-xs bg-gray rounded-full text-white ml-md" />

      {isOpen && <Menu onBlur={closeDropdown} onFocus={openDropdown} />}
    </ButtonSimple>
  );
};
/* -------------------------------- Hamburger ------------------------------- */
function StyledHamburger() {
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
const links: Record<'preference' | 'dashboard' | 'others', RouteProps[]> = {
  preference: [
    {
      textTranslateKey: 'about',
      href: '/about',
    },
    {
      textTranslateKey: 'register',
      href: '/register',
    },
    {
      textTranslateKey: 'login',
      href: '/login',
    },
  ],
  dashboard: [
    {
      textTranslateKey: 'about',
      href: '/about',
    },
    {
      textTranslateKey: 'register',
      href: '/register',
    },
    {
      textTranslateKey: 'login',
      href: '/login',
    },
  ],
  others: [
    {
      textTranslateKey: 'about',
      href: '/about',
    },
    {
      textTranslateKey: 'register',
      href: '/register',
    },
    {
      textTranslateKey: 'login',
      href: '/login',
    },
  ],
};

type MenuProps = HTMLAttributes<HTMLUListElement>;
function Menu(props: MenuProps) {
  return (
    <ul
      {...props}
      id="user-menu-menu"
      role="menu"
      aria-label="Menu links"
      tw="absolute top-[125%] right-0 bg-white min-w-[12.5rem] shadow rounded z-40"
    >
      <UserMenuLinksGroup
        tw="font-semibold"
        label="Your preferences"
        routes={links.preference}
      />

      <UserMenuLinksGroup label="Your dashboard" routes={links.dashboard} />

      <UserMenuLinksGroup label="Other settings" routes={links.others}>
        <UserMenuLink
          href="/"
          tw="text-danger font-semibold"
          textTranslateKey="logout"
        />
      </UserMenuLinksGroup>
    </ul>
  );
}

export default UserMenu;
