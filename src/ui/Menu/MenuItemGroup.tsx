import { useUuid } from '@hooks/useUuid';
import Text from '@ui/Text/Text';
import { ComponentProps, FC, ReactNode, useMemo } from 'react';

type MenuItemGroupProps = ComponentProps<'div'> & {
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
 *  <MenuItemGroup label={Group 3}> // You can mix as well
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
  const id = useUuid();
  const labelId = useMemo(() => `Menu-MenuItemGroup-Title-${id}`, [id]);
  return (
    <div
      role="group"
      aria-labelledby={label ? labelId : undefined}
      data-label={label}
      {...props}
    >
      {label && (
        <Text id={labelId} variant="overline" tw="px-md py-sm uppercase">
          {label}
        </Text>
      )}
      {children}
    </div>
  );
};

export default MenuItemGroup;
