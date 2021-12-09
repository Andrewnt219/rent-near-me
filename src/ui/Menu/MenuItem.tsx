import { FC } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { menuItemStyle } from './styles';

type MenuItemProps = RadixDropdownMenu.DropdownMenuItemProps;

/**
 * An item to be used within a `Menu` with an `onSelect` handler to perform user-defined action upon sleected.
 */
const MenuItem: FC<MenuItemProps> = (props) => {
  return <RadixDropdownMenu.Item css={menuItemStyle} {...props} />;
};

export default MenuItem;
