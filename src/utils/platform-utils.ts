import platform from 'platform';

export type PlatformInfo = {
  browser?: string;
  browserVersion?: string;
  device?: string;
  deviceManufacturer?: string;
  os?: string;
};

export const getPlatformInfo = (): PlatformInfo => ({
  browser: platform.name,
  browserVersion: platform.version,
  device: platform.product,
  deviceManufacturer: platform.manufacturer,
  os: platform.os?.toString(),
});
