import dayjs from 'dayjs';
import { mapObjectValueRecursivelySync } from './object-utils';
import { isJsonDateString } from './string-utils';

const parseModelMapper = (value: unknown) => {
  if (typeof value === 'string' && isJsonDateString(value)) {
    return dayjs(value).toDate();
  }
  return value;
};

export const parseModelSync = <T>(data: T) =>
  mapObjectValueRecursivelySync(data, parseModelMapper) as T;

export const parseModel = async <T>(data: T) =>
  (await mapObjectValueRecursivelySync(data, parseModelMapper)) as T;
