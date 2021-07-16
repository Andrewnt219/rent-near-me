import { RouteProps } from '@common-types';

export const accountSettingsRoutes: Record<string, RouteProps> = {
  'account-settings': {
    href: '/account-settings',
    textTranslateKey: 'account-settings:routes.index',
  },
  'login-and-security': {
    href: '/account-settings/login-and-security',
    textTranslateKey: 'account-settings:routes.login-and-security',
  },
};
