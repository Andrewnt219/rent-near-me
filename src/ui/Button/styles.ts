import tw, { css } from 'twin.macro';

type Size = 'lg' | 'md' | 'sm';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'link';

/**
 * Getter for styling of buttons and links when `icon` is `false` or not specified
 */
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

/**
 * Getter for styling of buttons and links when `icon` is `true`
 */
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

/**
 * Getter for styling of buttons and links when `rounded` is `true` and `icon` is `false` or not specified
 */
const getRoundedStyle = (rounded?: boolean) =>
  rounded ? tw`rounded-full` : tw`rounded`;

export type ButtonBaseProps = {
  /**
   * Appearance variant of the button
   */
  variant?: Variant;
  /**
   * Size of the button which can be different between regular and icon variant even at the same size
   */
  size?: Size;
  /**
   * Button would have the corners rounded if set to `true`. This prop is ignored when `icon` prop is `true`
   */
  rounded?: boolean;
  /**
   * Button would be styled in a circle shape if set to `true`.
   *
   * Usually used when onky a single icon should be displayed within the button.
   */
  icon?: boolean;
};

/**
 * Styling for button by variants
 */
const variantStyle: Record<Variant | '', ReturnType<typeof css>> = {
  '': css``,

  /**
   * Styling for button in `primary` variant
   */
  primary: css`
    ${tw`font-semibold  bg-primary text-white`}

    &:hover:not(:disabled) {
      ${tw`bg-primary-dark`}
    }

    &:active,
    &:focus-visible {
      ${tw`ring-4 ring-primary ring-opacity-50`}
    }
  `,

  /**
   * Styling for button in `secondary` variant
   */
  secondary: css`
    ${tw`font-semibold  bg-secondary text-white`}

    &:hover:not(:disabled) {
      ${tw`filter brightness-90`}
    }

    &:active,
    &:focus-visible {
      ${tw`ring-4 ring-secondary ring-opacity-50`}
    }
  `,

  /**
   * Styling for button in `ghost` variant
   */
  ghost: css`
    &:hover:not(:disabled) {
      ${tw`bg-light`}
    }

    &:focus-visible,
    &:active {
      ${tw`ring-2 ring-dark`}
    }
  `,

  /**
   * Styling for button in `outline` variant
   */
  outline: css`
    ${tw`border`}

    &:hover:not(:disabled), &:active {
      ${tw`bg-light`}
    }

    &:focus-visible {
      ${tw`ring-2 ring-dark`}
    }
  `,

  /**
   * Styling for button to look like a link
   */
  link: css`
    ${tw`underline text-secondary`}

    &:hover:not(:disabled) {
      ${tw`no-underline`}
    }

    &:focus-visible,
    &:active {
      ${tw`ring-2 ring-dark ring-offset-2`}
    }
  `,
};

/**
 * Computed styles for all buttons and links in `@ui/Button`
 */
export const styles = css<ButtonBaseProps>`
  ${(p) => variantStyle[p.variant ?? '']}
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
