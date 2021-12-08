import { Children, isValidElement, ReactNode, FC } from 'react';
import {
  Menu as ReachMenu,
  MenuButton as ReachMenuButton,
  MenuList as ReachMenuList,
  MenuListProps as ReachMenuListProps,
} from '@reach/menu-button';
import { menuStyle } from './styles';

type MenuProps = ReachMenuListProps & {
  /**
   * *A single {@link JSX.Element}* as the button to control the popup menu to be rendered where {@link Menu} is used.
   *
   * **Note:** A valid button here must be an HTML native element or an element that implement the {@link React.forwardRef} API
   * or the menu won't be interactive.
   */
  button: ReactNode;
};

/**
 * A container renders a popup menu and a button to control that popup.
 *
 * @example
 * A menu consisting of a mix of Menuitem and MenuLink and a ButtonGhost to control the menu
 * ```jsx
 * <Menu buton={<ButtonGhost rounded>Click me!</ButtonGhost>}>
 *  <MenuItem onSelect={() => console.log('Item 1 selected')}>Item 1</MenuItem>
 *  <MenuItem onSelect={() => console.log('Item 2 selected')}>Item 2</MenuItem>
 *  <MenuLink href="/url-of-link-1">Link 1</MenuLink>
 * </Menu>
 * ```
 */
const Menu: FC<MenuProps> = ({ button, children, ...props }) => {
  const btn = Children.only(button);
  return (
    <ReachMenu>
      <ReachMenuButton
        as={getMenuButtonComponentType(btn)}
        {...(isValidElement(btn) && btn.props)}
      />
      <ReachMenuList css={menuStyle} {...props}>
        {children}
      </ReachMenuList>
    </ReachMenu>
  );
};

/**
 * Getter for the element type of the menu-control button
 * (i.e.: `ButtonGhost` in the case of the example above)
 */
const getMenuButtonComponentType = (button: ReactNode) =>
  isValidElement(button) && typeof button.type !== 'string'
    ? button.type
    : 'button';

export default Menu;
