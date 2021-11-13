import { PlatformInfo } from '@libs/platformjs';

export type LoginPayload = PlatformInfo & {
  uid: string;
  authProvider: string;
  isFirstLogin: boolean;
};
