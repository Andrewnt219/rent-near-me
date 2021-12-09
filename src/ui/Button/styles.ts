import tw, { css } from 'twin.macro';

type Size = 'lg' | 'md' | 'sm';

const getRegularSizeStyle = (size?: Size) => {
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

function getIconSizeStyle(size?: Size) {
  switch (size) {
    case 'lg':
      return tw`w-12 h-12 p-sm text-h3`;

    case 'md':
      return tw`w-10 h-10 p-xs text-h4`;

    case 'sm':
      return tw`w-8 h-8 p-xs text-body2`;

    default:
      return tw``;
  }
}

const getRoundedStyle = (rounded?: boolean) =>
  rounded ? tw`rounded-full` : tw`rounded`;

export type BaseProps = {
  size?: Size;
  rounded?: boolean;
  icon?: boolean;
};
const baseStyle = css<BaseProps>`
  ${(p) =>
    p.icon
      ? css`
          ${tw`inline-flex items-center justify-center`}
          ${getIconSizeStyle(p.size)}
          ${getRoundedStyle(true)}
        `
      : css`
          ${tw`inline-block text-center`}
          ${tw`outline-none!`}
          ${getRegularSizeStyle(p.size)}
          ${getRoundedStyle(p.rounded)}
        `}
  ${tw`disabled:(opacity-60 cursor-not-allowed)`}
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
