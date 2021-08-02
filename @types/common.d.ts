declare module '@common-types' {
  import { LinkProps } from 'next/link';
  import { ReactNode } from 'react';
  import { UseControllerProps } from 'react-hook-form';
  import { StyledComponent } from 'styled-components';
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

  type GetLayout = (page: ReactNode) => ReactNode;
  type Controllers<TFormValues> = Record<
    keyof TFormValues,
    UseControllerProps<TFormValues>
  >;

  type StyledComponentProps<T> = T extends StyledComponent<
    any,
    any,
    infer P,
    any
  >
    ? P
    : never;
}
