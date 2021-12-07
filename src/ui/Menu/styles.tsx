import tw, { css } from 'twin.macro';

const menuItemStyle = css`
  ${tw`font-inherit block px-md py-sm hover:bg-light`}

  &[data-selected]:not(:hover) {
    ${tw`ring-2 ring-dark`}
  }
`;

const menuGroupStyle = css`
  ${tw`py-sm`}

  &:not(:last-of-type) {
    ${tw`border-b `}
  }
`;

export const menuStyle = css`
  ${tw`font-normal bg-white min-w-[12.5rem] shadow rounded z-40`}

  [role='group'] {
    ${menuGroupStyle}
  }

  [role='menuitem'] {
    ${menuItemStyle}
  }
`;
