import { FC } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import BaseMenuItem from './MenuItemBase';

type MenuItemProps = RadixDropdownMenu.DropdownMenuItemProps;

/**
 * An item to be used within a `Menu` with an `onSelect` handler to perform user-defined action upon sleected.
 */
const MenuItem: FC<MenuItemProps> = ({ children, ...props }) => {
  return (
    <BaseMenuItem {...props} asChild>
      <span>{children}</span>
    </BaseMenuItem>
  );
};

export default MenuItem;
