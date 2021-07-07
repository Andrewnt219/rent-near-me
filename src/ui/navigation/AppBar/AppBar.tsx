import { ComponentProps } from 'react';
import { FaHeart, FaSearch, FaUserAlt } from 'react-icons/fa';
import AppBarMenuItem from '../AppBarMenuItem/AppBarMenuItem';

type Props = {
  className?: string;
};
const AppBar = ({ className }: Props) => {
  return (
    <header
      className={className}
      tw="h-var-app-bar fixed bottom-0 left-0 right-0 py-md border-gray-light border-t bg-white"
    >
      <nav>
        <MenuList />
      </nav>
    </header>
  );
};

/* ---------------------------------- MENU ---------------------------------- */
const links: ComponentProps<typeof AppBarMenuItem>[] = [
  {
    href: '/',
    icon: <FaSearch />,
    textTranslateKey: 'home',
  },
  {
    href: '/wishlist',
    icon: <FaHeart />,
    textTranslateKey: 'wishlist',
  },
  {
    href: '/login',
    icon: <FaUserAlt />,
    textTranslateKey: 'login',
  },
];

function MenuList() {
  return (
    <ul tw="flex space-x-xl justify-center w-full">
      {links.map((linkProps) => (
        <li key={linkProps.href.toString()}>
          <AppBarMenuItem {...linkProps} />
        </li>
      ))}
    </ul>
  );
}

export default AppBar;
