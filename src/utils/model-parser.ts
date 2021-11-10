import dayjs from 'dayjs';
import { isJsonDateString } from './string-utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseObjectSync = (data: any): any => {
  if (typeof data === 'string' && isJsonDateString(data)) {
    return dayjs(data).toDate();
  }
  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      return data.map((elem) => parseObjectSync(elem));
    } else {
      return Object.fromEntries(
        Object.entries(data).map(([key, val]) => [key, parseObjectSync(val)])
      );
    }
  }
  return data;
};
export const parseModelSync = <T>(data: T) => parseObjectSync(data) as T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseObject = (data: any): Promise<any> => {
  if (typeof data === 'string' && isJsonDateString(data)) {
    return Promise.resolve(dayjs(data).toDate());
  }
  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      return Promise.all(data.map((elem) => parseObject(elem)));
    } else {
      return Promise.all(
        Object.entries(data).map(([key, val]) =>
          parseObject(val).then((fieldVal) => [key, fieldVal])
        )
      ).then((entries) => Object.fromEntries(entries));
    }
  }
  return Promise.resolve(data);
};
export const parseModel = async <T>(data: T) => (await parseObject(data)) as T;
