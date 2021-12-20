declare module '@common-types' {
  import { LinkProps } from 'next/link';
  import { StyledComponent } from 'styled-components';
  import { InferType } from 'yup';

  type RouteProps = LinkProps & {
    textTranslateKey: string;
    exact?: boolean;
  };
  type ModalControl = {
    name: string;
    isShow: boolean;
    show: () => void;
    hide: () => void;
    toggle: () => void;
  };
  type Await<T> = T extends PromiseLike<infer U> ? Await<U> : T;

  type Type<T> = {
    new (...args: any[]): T;
  };

  type RemoveIndex<T> = {
    [K in keyof T as string extends K
      ? never
      : number extends K
      ? never
      : K]: T[K];
  };
  type InferFromSchema<T> = RemoveIndex<InferType<T>>;

  type ItemType<T extends Array> = T[number];

  type Id = string | number | symbol;
}
