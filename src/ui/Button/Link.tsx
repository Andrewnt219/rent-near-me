import { ComponentProps, FC, forwardRef, Ref } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import {
  outlineStyle,
  ghostStyle,
  secondaryStyle,
  primaryStyle,
  linkStyle,
  BaseProps,
} from './styles';

type LinkProps = ComponentProps<'a'> &
  BaseProps & {
    href: string;
    nextLinkProps?: Omit<NextLinkProps, 'href'>;
    ref?: Ref<HTMLAnchorElement>;
  };

export const LinkBase: FC<LinkProps> = forwardRef(
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

export const LinkPrimary: FC<LinkProps> = forwardRef((props, ref) => (
  <LinkBase css={primaryStyle} {...props} ref={ref} />
));

export const LinkSecondary: FC<LinkProps> = forwardRef((props, ref) => (
  <LinkBase css={secondaryStyle} {...props} ref={ref} />
));

export const LinkGhost: FC<LinkProps> = forwardRef((props, ref) => (
  <LinkBase css={ghostStyle} {...props} ref={ref} />
));

export const LinkOutline: FC<LinkProps> = forwardRef((props, ref) => (
  <LinkBase css={outlineStyle} {...props} ref={ref} />
));

export const LinkSimple: FC<LinkProps> = forwardRef((props, ref) => (
  <LinkBase css={linkStyle} {...props} ref={ref} />
));
