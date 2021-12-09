import { FC } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { LinkBase, LinkProps } from '@ui/Button/Link';
import MenuItemBase from './MenuItemBase';

type MenuLinkProps = Omit<LinkProps, 'ref'> & {
  /**
   * Props passed into the popup menu item
   */
  menuItemProps?: RadixDropdownMenu.DropdownMenuItemProps;
};

/**
 * An item to be used within a `Menu` with an `href` prop to navigate user to a URL upon sleected.
 */
const MenuLink: FC<MenuLinkProps> = ({ menuItemProps, ...props }) => {
  return (
    <MenuItemBase {...menuItemProps} asChild>
      <LinkBase {...props} />
    </MenuItemBase>
  );
};

export default MenuLink;
