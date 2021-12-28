import { ComponentProps } from 'react';
import { styled } from 'twin.macro';
import { ButtonBaseProps, styles } from './styles';

export type ButtonProps = ComponentProps<'button'> & ButtonBaseProps;

/**
 * A component provides styling for a native {@link HTMLButtonElement}
 */
export const Button = styled.button<ButtonBaseProps>`
  ${styles}
`;
