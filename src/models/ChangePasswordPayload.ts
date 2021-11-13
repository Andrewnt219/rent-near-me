import { PlatformInfo } from '@utils/platform-utils';

export type ChangePasswordPayload = PlatformInfo & {
  uid: string;
};
