import { ReactNode, FC } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import tw, { styled } from 'twin.macro';

type MenuProps = RadixDropdownMenu.DropdownMenuProps & {
  /**
   * *A single {@link JSX.Element}* as the button to control the popup menu to be rendered where {@link Menu} is used.
   *
   * **Note:** A valid button here must be an HTML native element or an element that implement the {@link React.forwardRef} API.
   */
  button: ReactNode;
  /**
   * Props passed into the popup menu element
   */
  menuPopupProps?: RadixDropdownMenu.DropdownMenuContentProps;
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
const Menu: FC<MenuProps> = ({
  button,
  children,
  menuPopupProps,
  ...props
}) => {
  return (
    <RadixDropdownMenu.Root {...props}>
      <RadixDropdownMenu.Trigger asChild>{button}</RadixDropdownMenu.Trigger>
      <MenuContent align="start" sideOffset={8} {...menuPopupProps}>
        {children}
      </MenuContent>
    </RadixDropdownMenu.Root>
  );
};

export default Menu;

/**
 * A component provides styling for {@link RadixDropdownMenu.Content} (the menu popup)
 */
const MenuContent = styled(RadixDropdownMenu.Content)`
  ${tw`font-normal bg-white min-w-[12.5rem] shadow-z8 rounded`}
`;
