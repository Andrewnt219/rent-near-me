import tw, { styled } from 'twin.macro';

const commonStyle = tw`rounded outline-none!`;

type Size = 'lg' | 'md' | 'sm';
function getSizeStyle(size: Size | undefined) {
  switch (size) {
    case 'lg':
      return tw`px-md py-md text-h6`;

    case 'md':
      return tw`px-md py-sm text-body1`;

    case 'sm':
      return tw`px-sm py-xs text-button`;

    default:
      return tw``;
  }
}

type BaseButtonProps = {
  size?: Size;
  circle?: boolean;
};
const BaseButton = styled.button<BaseButtonProps>`
  ${commonStyle}
  ${(p) => getSizeStyle(p.size)}
  ${(p) => p.circle && tw`rounded-full`}
`;

/* -------------------------------------------------------------------------- */

export const ButtonPrimary = styled(BaseButton)`
  ${tw`font-semibold  bg-primary text-white`}

  &:hover {
    ${tw`filter brightness-90`}
  }

  &:active,
  &:focus-visible {
    ${tw`ring-4 ring-primary ring-opacity-50`}
  }
`;

/* -------------------------------------------------------------------------- */
export const ButtonSecondary = styled(BaseButton)`
  ${tw`font-semibold  bg-secondary text-white`}

  &:hover {
    ${tw`filter brightness-90`}
  }

  &:active,
  &:focus-visible {
    ${tw`ring-4 ring-secondary ring-opacity-50`}
  }
`;

/* -------------------------------------------------------------------------- */
export const ButtonGhost = styled(BaseButton)`
  &:hover {
    ${tw`bg-light`}
  }

  &:focus-visible,
  &:active {
    ${tw`ring-2 ring-dark`}
  }
`;

/* -------------------------------------------------------------------------- */

export const ButtonOutline = styled(BaseButton)`
  ${tw`border`}

  &:hover, &:active {
    ${tw`bg-light`}
  }

  &:focus-visible {
    ${tw`ring-2 ring-dark`}
  }
`;

/* -------------------------------------------------------------------------- */
export const ButtonLink = styled(BaseButton)`
  ${tw`underline text-secondary`}

  &:hover {
    ${tw`no-underline`}
  }

  &:focus-visible,
  &:active {
    ${tw`ring-2 ring-dark ring-offset-2`}
  }
`;

/* -------------------------------------------------------------------------- */
