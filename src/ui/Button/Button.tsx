import { ringStyle } from '@styles/globals-styles';
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
  &:focus-visible {
    ${ringStyle}
  }

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
    props.outline ? tw`border hover:border-dark` : tw`hover:bg-gray-light`}
`;

export const ButtonLink = styled.button<ButtonProps>`
  ${tw`focus-visible:(ring ring-dark ring-offset-1)`}
  ${tw`text-link underline`}

  ${(props) => (props.size ? buttonCss.size[props.size] : buttonCss.size.none)}
  ${(props) => (props.rounded ? buttonCss.shape.round : tw`rounded-sm`)}
`;

export const ButtonLinkDark = styled(ButtonLink)`
  ${tw`text-dark`}
`;

export const ButtonLink = styled.button<ButtonProps>`
  ${tw`focus-visible:(ring ring-dark ring-offset-1)`}
  ${(props) => (props.size ? buttonCss.size[props.size] : buttonCss.size.none)}
  ${(props) => props.rounded && buttonCss.shape.round}

  ${tw`text-dark focus-visible:text-gray`}
  ${tw`underline`}
`;
