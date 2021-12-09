import tw, { css } from 'twin.macro';

/**
 * Styles applied to MenuItem and MenuLink
 */
export const menuItemStyle = css`
  ${tw`font-inherit block px-md py-sm hover:bg-light`}

  &:focus-visible {
    ${tw`ring-2 ring-dark`}
  }
`;

/**
 * Styles applied to MenuItemGroup
 */
export const menuGroupStyle = css`
  ${tw`py-sm`}
`;

/**
 * Styled applied to MenuItemGroup's label
 */
export const menuGroupLabelStyle = css`
  ${tw`px-md py-sm uppercase`}
`;

/**
 * Styled applied to MenuItemGroup's separator
 */
export const menuSeparatorStyle = css`
  &:last-child {
    ${tw`hidden`}
  }
`;

/**
 * Styled applied to Menu
 */
export const menuStyle = css`
  ${tw`font-normal bg-white min-w-[12.5rem] shadow-z8 rounded`}
`;
