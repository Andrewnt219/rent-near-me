import tw, { css, styled } from 'twin.macro';

type ButtonProps = {
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'none';
  rounded?: boolean;
  outline?: boolean;
};

// size
const buttonCss = {
  shape: {
    round: tw`rounded-full`,
  },
  size: {
    xl: css`
      ${tw`px-xl py-2.5 rounded-md`}
      ${tw`font-bold text-lg`}
    `,
    lg: css``,
    md: css`
      ${tw`px-md py-2 rounded-md`}
      ${tw`font-semibold`}
    `,
    sm: css`
      ${tw`p-sm rounded-sm`}
    `,
    xs: css`
      ${tw`p-xs`}
    `,
    none: css`
      ${tw`p-0`}
    `,
  },
};

const Button = styled.button<ButtonProps>`
  ${tw`focus-visible:(ring-2 ring-dark ring-offset-2)`}
  ${(props) => (props.size ? buttonCss.size[props.size] : buttonCss.size.md)}
  ${(props) => props.rounded && buttonCss.shape.round}
`;

export const ButtonPrimary = styled(Button)`
  ${(props) =>
    props.outline
      ? tw`border-primary text-primary hover:(bg-primary text-white)`
      : tw`bg-primary hover:bg-primary-dark text-white`}
`;

export const ButtonSimple = styled(Button)`
  ${(props) =>
    props.outline
      ? tw`border border-gray-light hover:border-dark`
      : tw`hover:bg-gray-light`}
`;
