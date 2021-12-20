import { ComponentProps, forwardRef } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ButtonBaseProps } from './styles';
import { Button } from '.';

export type LinkProps = ComponentProps<'a'> &
  ButtonBaseProps & {
    href: string;
    nextLinkProps?: Omit<NextLinkProps, 'href'>;
  };

/**
 * A Link component that implements the {@link React.forwardRef} API and is capable of
 * rendering both internal links with {@link NextLink} and external links with native {@link HTMLAnchorElement}
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, nextLinkProps, ...props }, ref) =>
    href.startsWith('/') ? (
      <NextLink href={href} {...nextLinkProps} passHref>
        <Button as="a" {...props} ref={ref} />
      </NextLink>
    ) : (
      <Button
        as="a"
        href={href}
        {...props}
        ref={ref}
        rel="noopener noreferrer nofollow"
      />
    )
);
