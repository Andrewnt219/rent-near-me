import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import heartFill from '@iconify/icons-eva/heart-fill';
import personFill from '@iconify/icons-eva/person-fill';
import { ComponentProps } from 'react';
import AppBarMenuItem from './AppBarMenuItem';

type Props = {
  className?: string;
};
const AppBar = ({ className }: Props) => {
  return (
    <header
      className={className}
      tw="z-10 fixed shadow h-var-app-bar-height bottom-0 left-0 right-0 py-md  border-t bg-white"
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
    icon: <Icon icon={searchFill} />,
    textTranslateKey: 'home',
  },
  {
    href: '/wishlist',
    icon: <Icon icon={heartFill} />,
    textTranslateKey: 'wishlist',
  },
  {
    href: '/login',
    icon: <Icon icon={personFill} />,
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
