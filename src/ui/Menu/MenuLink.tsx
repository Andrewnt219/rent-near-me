import {
  MenuLink as ReachMenuLink,
  MenuLinkProps as ReachMenuLinkProps,
} from '@reach/menu-button';
import { LinkBase } from '@ui/Button/Link';
import { FC } from 'react';

type MenuLinkProps = ReachMenuLinkProps & {
  href: string;
};

const MenuLink: FC<MenuLinkProps> = (props) => {
  return <ReachMenuLink as={LinkBase} {...props} />;
};

export default MenuLink;
