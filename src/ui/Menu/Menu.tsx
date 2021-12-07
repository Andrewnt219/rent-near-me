import { Children, isValidElement, ReactNode, FC } from 'react';
import {
  Menu as ReachMenu,
  MenuButton as ReachMenuButton,
  MenuList as ReachMenuList,
} from '@reach/menu-button';
import { menuStyle } from './styles';

type MenuProps = {
  button: ReactNode;
};

const Menu: FC<MenuProps> = ({ button, children }) => {
  const btn = Children.only(button);

  return (
    <ReachMenu>
      <ReachMenuButton
        as={getMenuButtonComponentType(btn)}
        {...(isValidElement(btn) ? btn.props : {})}
      />
      <ReachMenuList css={menuStyle}>{children}</ReachMenuList>
    </ReachMenu>
  );
};

const getMenuButtonComponentType = (button: ReactNode) =>
  isValidElement(button) && typeof button.type !== 'string'
    ? button.type
    : 'button';

export default Menu;
