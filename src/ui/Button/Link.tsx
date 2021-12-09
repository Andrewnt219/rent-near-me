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

/**
 * A Link component that implements the {@link React.forwardRef} API and is capable of
 * rendering both internal links with {@link NextLink} and external links with native {@link HTMLAnchorElement}
 */
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

/**
 * {@link LinkBase} with {@link primaryStyle}
 */
export const LinkPrimary = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <LinkBase css={primaryStyle} {...props} ref={ref} />
);

/**
 * {@link LinkBase} with {@link secondaryStyle}
 */
export const LinkSecondary = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <LinkBase css={secondaryStyle} {...props} ref={ref} />
);

/**
 * {@link LinkBase} with {@link ghostStyle}
 */
export const LinkGhost = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <LinkBase css={ghostStyle} {...props} ref={ref} />
);

/**
 * {@link LinkBase} with {@link outlineStyle}
 */
export const LinkOutline = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <LinkBase css={outlineStyle} {...props} ref={ref} />
);

/**
 * {@link LinkBase} with {@link linkStyle} (regular link appearance)
 */
export const LinkSimple = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <LinkBase css={linkStyle} {...props} ref={ref} />
);
