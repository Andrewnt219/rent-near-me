import {
  MenuLink as ReachMenuLink,
  MenuLinkProps as ReachMenuLinkProps,
} from '@reach/menu-button';
import { LinkBase } from '@ui/Button/Link';
import { FC } from 'react';

type MenuLinkProps = ReachMenuLinkProps & {
  href: string;
};

/**
 * An item to be used within a `Menu` with an `href` prop to navigate user to a URL upon sleected.
 */
const MenuLink: FC<MenuLinkProps> = (props) => {
  return <ReachMenuLink as={LinkBase} {...props} />;
};

export default MenuLink;
