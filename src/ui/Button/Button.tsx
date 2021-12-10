import { ComponentProps } from 'react';
import { styled } from 'twin.macro';
import {
  primaryStyle,
  secondaryStyle,
  ghostStyle,
  outlineStyle,
  linkStyle,
  BaseProps,
} from './styles';

/**
 * Props for all the buttons in `@ui/Button/Button`
 */
export type ButtonProps = ComponentProps<'button'> & BaseProps;

/**
 * Button with {@link primaryStyle}
 */
export const ButtonPrimary = styled.button<BaseProps>`
  ${primaryStyle}
`;

/**
 * Native {@link HTMLButtonElement} with {@link secondaryStyle}
 */
export const ButtonSecondary = styled.button<BaseProps>`
  ${secondaryStyle}
`;

/**
 * Native {@link HTMLButtonElement} with {@link ghostStyle}
 */
export const ButtonGhost = styled.button<BaseProps>`
  ${ghostStyle}
`;

/**
 * Native {@link HTMLButtonElement} with {@link outlineStyle}
 */
export const ButtonOutline = styled.button<BaseProps>`
  ${outlineStyle}
`;

/**
 * Native {@link HTMLButtonElement} with {@link linkStyle}
 */
export const ButtonLink = styled.button<BaseProps>`
  ${linkStyle}
`;
