import { PlatformInfo } from '@utils/platform-utils';

export type LoginPayload = PlatformInfo & {
  uid: string;
  authProvider: string;
  isFirstLogin: boolean;
};
