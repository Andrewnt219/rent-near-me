import { RouteProps } from '@common-types';
import { useRouter } from 'next/router';

type RoutesLookup<Key extends string> = Record<Key, RouteProps>;
export const useStaticBreadCrumb = <Key extends string>(
  routesLookup: RoutesLookup<Key>
): RouteProps[] => {
  const { asPath } = useRouter();

  const isKey = (str: any): str is Key => str in routesLookup;

  return asPath
    .split('/')
    .filter(isKey)
    .map((str) => routesLookup[str]);
};
