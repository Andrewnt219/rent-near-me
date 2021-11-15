import { styled } from 'twin.macro';
import {
  primaryStyle,
  secondaryStyle,
  ghostStyle,
  outlineStyle,
  linkStyle,
  BaseProps,
} from './styles';

export const ButtonPrimary = styled.button<BaseProps>`
  ${primaryStyle}
`;

export const ButtonSecondary = styled.button<BaseProps>`
  ${secondaryStyle}
`;

export const ButtonGhost = styled.button<BaseProps>`
  ${ghostStyle}
`;

export const ButtonOutline = styled.button<BaseProps>`
  ${outlineStyle}
`;

export const ButtonLink = styled.button<BaseProps>`
  ${linkStyle}
`;
