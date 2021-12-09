import { ComponentProps, forwardRef } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import {
  outlineStyle,
  ghostStyle,
  secondaryStyle,
  primaryStyle,
  linkStyle,
  BaseProps,
} from './styles';

export type LinkProps = ComponentProps<'a'> &
  BaseProps & {
    href: string;
    nextLinkProps?: Omit<NextLinkProps, 'href'>;
  };

export const LinkBase = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, nextLinkProps, children, ...props }, ref) =>
    href.startsWith('/') ? (
      <NextLink href={href} {...nextLinkProps}>
        <a {...props} ref={ref}>
          {children}
        </a>
      </NextLink>
    ) : (
      <a href={href} {...props} ref={ref} rel="noopener noreferrer nofollow">
        {children}
      </a>
    )
);

export const LinkPrimary = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <LinkBase css={primaryStyle} {...props} ref={ref} />
);

export const LinkSecondary = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <LinkBase css={secondaryStyle} {...props} ref={ref} />
);

export const LinkGhost = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <LinkBase css={ghostStyle} {...props} ref={ref} />
);

export const LinkOutline = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <LinkBase css={outlineStyle} {...props} ref={ref} />
);

export const LinkSimple = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <LinkBase css={linkStyle} {...props} ref={ref} />
);
