declare module '@common-types' {
  import { LinkProps } from 'next/link';
  type RouteProps = LinkProps & {
    textTranslateKey: string;
    exact?: boolean;
  };
}
