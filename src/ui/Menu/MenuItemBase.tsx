import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import tw, { styled } from 'twin.macro';

/**
 * A component provides styling for items used within a `Menu`
 */
const MenuItemBase = styled(RadixDropdownMenu.Item)`
  ${tw`font-inherit block px-md py-sm cursor-pointer hover:bg-light`}
  ${(p) => p.disabled && tw`cursor-not-allowed hover:bg-transparent`}

  &:focus-visible:not(:hover) {
    ${tw`ring-inset ring-2 ring-dark`}
  }
`;

export default MenuItemBase;
