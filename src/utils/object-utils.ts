/* eslint-disable @typescript-eslint/no-explicit-any */

export const mapObjectValueSync = (
  obj: any,
  mapper: (value: any) => any
): any => {
  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      return obj.map((elem) => mapObjectValueSync(elem, mapper));
    } else {
      return Object.fromEntries(
        Object.entries(obj).map(([key, val]) => [
          key,
          mapObjectValueSync(val, mapper),
        ])
      );
    }
  }
  return mapper(obj);
};

export const mapObjectValue = (
  obj: any,
  mapper: (value: any) => any | Promise<any>
): Promise<any> => {
  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      return Promise.all(obj.map((elem) => mapObjectValue(elem, mapper)));
    } else {
      return Promise.all(
        Object.entries(obj).map(([key, val]) =>
          mapObjectValue(val, mapper).then((fieldVal) => [key, fieldVal])
        )
      ).then((entries) => Object.fromEntries(entries));
    }
  }
  return Promise.resolve(mapper(obj));
};
