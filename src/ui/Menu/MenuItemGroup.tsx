import { ComponentProps, FC } from 'react';

type MenuItemGroupProps = ComponentProps<'div'>;

/**
 * A container that provides extra styling and a11y features to put related MenuItem and/or MenuList into groups.
 *
 * @example
 * Menu with multiple MenuItemGroup of multiple items
 * ```jsx
 * <Menu button={<button>Click me!</button>}>
 *  <MenuItemGroup> // Group of MenuItem
 *    <MenuItem onSelect={() => { ... }}>Item 1</MenuItem>
 *    <MenuItem onSelect={() => { ... item 2 logic *\/ }}>Item 2</MenuItem>
 *  </MenuItemGroup>
 *  <MenuItemGroup> // Group of Menulink
 *    <MenuLink href="/url-to-link-1">Item 1</MenuLink>
 *    <MenuLink href="/url-to-link-2">Item 2</MenuLink>
 *    <MenuLink href="/url-to-link-3">Item 3</MenuLink>
 *  </MenuItemGroup>
 *  <MenuItemGroup> // You can mix as well
 *    <MenuItem onSelect={() => { ... }}>Item 3</MenuItem>
 *    <MenuItem onSelect={() => { ... }}>Item 4</MenuItem>
 *    <MenuLink href="/url-to-link-3">Item 4</MenuLink>
 *  </MenuItemGroup>
 * </Menu>
 * ```
 */
const MenuItemGroup: FC<MenuItemGroupProps> = (props) => {
  return <div role="group" {...props} />;
};

export default MenuItemGroup;
