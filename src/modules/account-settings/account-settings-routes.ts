import { RouteProps } from '@common-types';

export const accountSettingsRoutes: Record<string, RouteProps> = {
  'account-settings': {
    href: '/account-settings',
    textTranslateKey: 'account-settings.index',
  },
  'login-and-security': {
    href: '/account-settings/login-and-security',
    textTranslateKey: 'account-settings.login-and-security',
  },
};
