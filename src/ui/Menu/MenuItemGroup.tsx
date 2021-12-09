import { FC, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import Text from '@ui/Text/Text';

type MenuItemGroupProps = RadixDropdownMenu.DropdownMenuGroupProps & {
  /**
   * Label of the MenuItemGroup
   */
  label?: ReactNode;
};

/**
 * A container that provides extra styling and a11y features to assign related MenuItem and/or MenuList into groups.
 *
 * @example
 * Menu with multiple MenuItemGroup of multiple items
 * ```jsx
 * <Menu button={<button>Click me!</button>}>
 *  <MenuItemGroup label="Group 1"> // Group of MenuItem with label
 *    <MenuItem onSelect={() => { ... }}>Item 1</MenuItem>
 *    <MenuItem onSelect={() => { ... item 2 logic *\/ }}>Item 2</MenuItem>
 *  </MenuItemGroup>
 *  <MenuItemGroup> // Group of Menulink without label
 *    <MenuLink href="/url-to-link-1">Item 1</MenuLink>
 *    <MenuLink href="/url-to-link-2">Item 2</MenuLink>
 *    <MenuLink href="/url-to-link-3">Item 3</MenuLink>
 *  </MenuItemGroup>
 *  <MenuItemGroup label={`Group 3`}> // You can mix as well
 *    <MenuItem onSelect={() => { ... }}>Item 3</MenuItem>
 *    <MenuItem onSelect={() => { ... }}>Item 4</MenuItem>
 *    <MenuLink href="/url-to-link-3">Item 4</MenuLink>
 *  </MenuItemGroup>
 * </Menu>
 * ```
 */
const MenuItemGroup: FC<MenuItemGroupProps> = ({
  label,
  children,
  ...props
}) => {
  return (
    <>
      <MenuGroup {...props}>
        {label && (
          <MenuLabel asChild>
            <Text variant="overline">{label}</Text>
          </MenuLabel>
        )}
        {children}
      </MenuGroup>
      <MenuSeparator asChild>
        <hr />
      </MenuSeparator>
    </>
  );
};

export default MenuItemGroup;

/**
 * A component provides styling for {@link RadixDropdownMenu.Group}
 */
const MenuGroup = styled(RadixDropdownMenu.Group)`
  ${tw`py-sm`}
`;

/**
 * A component provides styling for {@link RadixDropdownMenu.Label}
 */
const MenuLabel = styled(RadixDropdownMenu.Label)`
  ${tw`px-md py-sm uppercase`}
`;

/**
 * A component provides styling for {@link RadixDropdownMenu.Separator}
 */
const MenuSeparator = styled(RadixDropdownMenu.Separator)`
  &:last-child {
    ${tw`hidden`}
  }
`;
