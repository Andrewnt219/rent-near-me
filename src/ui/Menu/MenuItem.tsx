import {
  MenuItem as ReachMenuItem,
  MenuItemProps as ReachMenuItemProps,
} from '@reach/menu-button';
import { FC } from 'react';

type MenuItemProps = ReachMenuItemProps;

const MenuItem: FC<MenuItemProps> = (props) => {
  return <ReachMenuItem as="span" {...props} />;
};

export default MenuItem;
