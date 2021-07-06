import { RouteProps } from '@common-types';
import { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { useClickOutside } from 'src/hooks/useClickOutside';
import tw, { styled } from 'twin.macro';
import UserMenuLink from './components/UserMenuLink/UserMenuLink';
import UserMenuLinksGroup from './components/UserMenuLinksGroup/UserMenuLinksGroup';

type Props = {
  className?: string;
};
const UserMenu = ({ className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useClickOutside<HTMLButtonElement>(() => setIsOpen(false));

  const handleMenuClick = () => setIsOpen((prev) => !prev);

  return (
    <button
      ref={buttonRef}
      className={className}
      id="user-menu-button"
      aria-haspopup
      aria-controls="user-menu-menu"
      aria-expanded={isOpen}
      aria-pressed={isOpen}
      onClick={handleMenuClick}
      tw="flex border text-left relative rounded-full pl-md pr-sm py-sm transition-shadow hover:shadow"
    >
      <span tw="sr-only">Menu</span>

      <StyledHamburger />

      <FaUserAlt tw="h-7 w-7 p-xs bg-gray rounded-full text-white ml-md" />

      {isOpen && <Menu />}
    </button>
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
      text: 'About',
      href: '/about',
    },
    {
      text: 'Register',
      href: '/register',
    },
    {
      text: 'Login',
      href: '/login',
    },
  ],
  dashboard: [
    {
      text: 'About',
      href: '/about',
    },
    {
      text: 'Register',
      href: '/register',
    },
    {
      text: 'Login',
      href: '/login',
    },
  ],
  others: [
    {
      text: 'About',
      href: '/about',
    },
    {
      text: 'Register',
      href: '/register',
    },
    {
      text: 'Login',
      href: '/login',
    },
  ],
};

function Menu() {
  return (
    <ul
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
        <UserMenuLink href="/" tw="text-danger font-semibold" text="Logout" />
      </UserMenuLinksGroup>
    </ul>
  );
}

export default UserMenu;
