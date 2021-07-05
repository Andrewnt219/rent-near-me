import { useRouter } from 'next/router';

/**
 * @param linkHref the href of the link
 * @param exact on = matches exactly / off = matches subpath also
 */
export const useRouteMatch = (linkHref: string, exact?: boolean): boolean => {
  const { asPath } = useRouter();
  return exact ? asPath === linkHref : asPath.startsWith(linkHref);
};
