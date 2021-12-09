import tw, { css } from 'twin.macro';

/**
 * Styles applied to MenuItem and MenuLink
 */
const menuItemStyle = css`
  ${tw`font-inherit block px-md py-sm hover:bg-light`}

  &[data-selected]:not(:hover) {
    ${tw`ring-2 ring-dark`}
  }
`;

/**
 * Styles applied to MenuItem and MenuLink within a MenuItemGroup with a label
 */
const menuItemInLabelledGroupAdditionalStyle = css`
  ${tw`pl-lg`}
`;

/**
 * Styles applied to MenuItemGroup
 */
const menuGroupStyle = css`
  ${tw`py-sm`}

  &:not(:last-of-type) {
    ${tw`border-b `}
  }

  &[data-label] [role='menuitem'] {
    ${menuItemInLabelledGroupAdditionalStyle}
  }
`;

/**
 * Styled applied to Menu
 */
export const menuStyle = css`
  ${tw`font-normal bg-white min-w-[12.5rem] shadow rounded z-40`}

  [role='group'] {
    ${menuGroupStyle}
  }

  [role='menuitem'] {
    ${menuItemStyle}
  }
`;
