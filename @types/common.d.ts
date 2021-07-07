declare module '@common-types' {
  import { LinkProps } from 'next/link';
  type RouteProps = LinkProps & {
    textTranslateKey:
      | 'wishlist'
      | 'home'
      | 'register'
      | 'login'
      | 'logout'
      | 'about';
    exact?: boolean;
  };
}
