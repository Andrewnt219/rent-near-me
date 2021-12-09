import {
  MenuItem as ReachMenuItem,
  MenuItemProps as ReachMenuItemProps,
} from '@reach/menu-button';
import { FC } from 'react';

type MenuItemProps = ReachMenuItemProps;

/**
 * An item to be used within a `Menu` with an `onSelect` handler to perform user-defined action upon sleected.
 */
const MenuItem: FC<MenuItemProps> = (props) => {
  return <ReachMenuItem as="span" {...props} />;
};

export default MenuItem;
