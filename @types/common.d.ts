declare module '@common-types' {
  import { LinkProps } from 'next/link';
  import { ReactNode } from 'react';
  type RouteProps = LinkProps & {
    text: ReactNode;
    exact?: boolean;
  };
}
