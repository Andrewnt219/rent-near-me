import { PlatformInfo } from '@libs/platformjs';

export type ChangePasswordPayload = PlatformInfo & {
  uid: string;
};
