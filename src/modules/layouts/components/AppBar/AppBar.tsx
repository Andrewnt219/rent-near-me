import { ComponentProps } from 'react';
import { MdFavorite, MdSearch, MdDashboard } from 'react-icons/md';
import AppBarMenuItem from '../AppBarMenuItem/AppBarMenuItem';

type Props = {
  className?: string;
};
const AppBar = ({ className }: Props) => {
  return (
    <header
      className={className}
      tw="h-lg z-40 fixed bottom-0 left-0 right-0 py-md  border-t bg-white"
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
    icon: <MdSearch />,
    textTranslateKey: 'home',
  },
  {
    href: '/wishlist',
    icon: <MdFavorite />,
    textTranslateKey: 'wishlist',
  },
  {
    href: '/login',
    icon: <MdDashboard />,
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
