import tw, { styled } from 'twin.macro';

type Size = 'sm' | 'md' | 'lg';

function getIconButonSize(size: Size | undefined) {
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
type IconButtonProps = {
  size?: Size;
};
const IconButton = styled.button<IconButtonProps>`
  ${(p) => getIconButonSize(p.size)}

  ${tw`inline-flex items-center justify-center rounded-full`}
`;

/* -------------------------------------------------------------------------- */
export const IconButtonGhost = styled(IconButton)`
  &:hover {
    ${tw`bg-light`}
  }

  &:active,
  &:focus-visible {
    ${tw`ring-2 ring-dark`}
  }
`;

/* -------------------------------------------------------------------------- */

export const IconButtonPrimary = styled(IconButton)`
  ${tw`font-semibold  bg-primary text-white`}

  &:hover {
    ${tw`filter brightness-90`}
  }

  &:active,
  &:focus-visible {
    ${tw`ring-4 ring-primary ring-opacity-50`}
  }
`;
