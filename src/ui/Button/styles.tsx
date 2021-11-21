import tw, { css } from 'twin.macro';

const commonStyle = tw`rounded outline-none! inline-block text-center disabled:(opacity-60 cursor-not-allowed)`;

const getSizeStyle = (size?: Size) => {
  switch (size) {
    case 'lg':
      return tw`px-md py-md text-h6 min-w-[6rem]`;

    case 'md':
      return tw`px-md py-sm text-body1 min-w-[4rem]`;

    case 'sm':
      return tw`px-sm py-xs text-button min-w-[4rem]`;

    default:
      return tw``;
  }
};

const getRoundedStyle = (circle?: boolean) => circle && tw`rounded-full`;

type Size = 'lg' | 'md' | 'sm';
export type BaseProps = {
  size?: Size;
  rounded?: boolean;
};
const baseStyle = css<BaseProps>`
  ${commonStyle}
  ${(p) => getSizeStyle(p.size)}
  ${(p) => getRoundedStyle(p.rounded)}
`;

export const primaryStyle = css`
  ${baseStyle}

  ${tw`font-semibold  bg-primary text-white`}

  &:hover:not(:disabled) {
    ${tw`bg-primary-dark`}
  }

  &:active,
  &:focus-visible {
    ${tw`ring-4 ring-primary ring-opacity-50`}
  }
`;

export const secondaryStyle = css`
  ${baseStyle}

  ${tw`font-semibold  bg-secondary text-white`}

  &:hover:not(:disabled) {
    ${tw`filter brightness-90`}
  }

  &:active,
  &:focus-visible {
    ${tw`ring-4 ring-secondary ring-opacity-50`}
  }
`;

export const ghostStyle = css`
  ${baseStyle}

  &:hover:not(:disabled) {
    ${tw`bg-light`}
  }

  &:focus-visible,
  &:active {
    ${tw`ring-2 ring-dark`}
  }
`;

export const outlineStyle = css`
  ${baseStyle}

  ${tw`border`}

  &:hover:not(:disabled), &:active {
    ${tw`bg-light`}
  }

  &:focus-visible {
    ${tw`ring-2 ring-dark`}
  }
`;

export const linkStyle = css`
  ${baseStyle}

  ${tw`underline text-secondary`}

  &:hover:not(:disabled) {
    ${tw`no-underline`}
  }

  &:focus-visible,
  &:active {
    ${tw`ring-2 ring-dark ring-offset-2`}
  }
`;
