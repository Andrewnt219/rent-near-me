import {
  MenuItem as ReachMenuItem,
  MenuItemProps as ReachMenuItemProps,
} from '@reach/menu-button';
import { FC } from 'react';
import { menuItemStyle } from './styles';

type MenuItemProps = ReachMenuItemProps;

const MenuItem: FC<MenuItemProps> = (props) => {
  return <ReachMenuItem css={menuItemStyle} {...props} />;
};

export default MenuItem;
