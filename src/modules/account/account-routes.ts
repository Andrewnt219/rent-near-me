import { RouteProps } from '@common-types';

export const accountRoutes: Record<string, RouteProps> = {
  account: {
    href: '/account',
    textTranslateKey: 'account.index',
  },
  security: {
    href: '/account/security',
    textTranslateKey: 'account.security',
  },
  payments: {
    href: '/account/payments',
    textTranslateKey: 'account.payments',
  },
};
