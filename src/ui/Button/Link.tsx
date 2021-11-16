import { FC, HTMLProps } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import {
  outlineStyle,
  ghostStyle,
  secondaryStyle,
  primaryStyle,
  linkStyle,
  BaseProps,
} from './styles';

type LinkProps = Omit<HTMLProps<HTMLAnchorElement>, keyof BaseProps> &
  BaseProps & {
    href: string;
    nextLinkProps?: Omit<NextLinkProps, 'href'>;
  };

export const LinkBase: FC<LinkProps> = ({
  href,
  nextLinkProps,
  children,
  ...props
}) =>
  href.startsWith('/') ? (
    <NextLink href={href} {...nextLinkProps}>
      <a {...props}>{children}</a>
    </NextLink>
  ) : (
    <a href={href} {...props} rel="noopener noreferrer nofollow">
      {children}
    </a>
  );

export const LinkPrimary: FC<LinkProps> = (props) => (
  <LinkBase css={primaryStyle} {...props} />
);

export const LinkSecondary: FC<LinkProps> = (props) => (
  <LinkBase css={secondaryStyle} {...props} />
);

export const LinkGhost: FC<LinkProps> = (props) => (
  <LinkBase css={ghostStyle} {...props} />
);

export const LinkOutline: FC<LinkProps> = (props) => (
  <LinkBase css={outlineStyle} {...props} />
);

export const LinkSimple: FC<LinkProps> = (props) => (
  <LinkBase css={linkStyle} {...props} />
);
