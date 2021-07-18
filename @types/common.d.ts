declare module '@common-types' {
  import { LinkProps } from 'next/link';
  import { ReactNode } from 'react';
  type RouteProps = LinkProps & {
    textTranslateKey: string;
    exact?: boolean;
  };
  type ModalControl = {
    isShow: boolean;
    show: () => void;
    hide: () => void;
    toggle: () => void;
  };
  type Await<T> = T extends PromiseLike<infer U> ? Await<U> : T;

  type WithLayout = (page: ReactNode) => ReactNode;
}
