import { ComponentProps, FC } from 'react';

type MenuItemGroupProps = ComponentProps<'div'>;

const MenuItemGroup: FC<MenuItemGroupProps> = (props) => {
  return <div role="group" {...props} />;
};

export default MenuItemGroup;
