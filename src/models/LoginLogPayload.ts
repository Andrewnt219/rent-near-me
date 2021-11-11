export type LoginLogPayload = {
  uid: string;
  authProvider: string;
  browser?: string;
  browserVersion?: string;
  device?: string;
  deviceManufacturer?: string;
  os?: string;
};
