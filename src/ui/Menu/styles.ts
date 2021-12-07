import tw, { css } from 'twin.macro';

export const menuStyle = css`
  ${tw`font-normal bg-white min-w-[12.5rem] shadow rounded z-40`}

  .Menu-PseudoGroup-FirstItem {
    ${tw`mt-sm`}
  }

  .Menu-PseudoGroup-LastItem {
    ${tw`mb-sm`}
  }

  .Menu-PseudoGroup-Divider:last-of-type {
    ${tw`hidden`}
  }
`;

export const menuItemStyle = css`
  ${tw`font-inherit block px-md py-sm hover:bg-light`}

  &[data-selected]:not(:hover) {
    ${tw`ring-2 ring-dark`}
  }
`;
