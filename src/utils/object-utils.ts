/* eslint-disable @typescript-eslint/no-explicit-any */

export const mapObjectValueRecursivelySync = (
  obj: any,
  mapper: (value: any) => any
): any => {
  const mappedValue = mapper(obj);
  if (mappedValue === obj && typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      return obj.map((elem) => mapObjectValueRecursivelySync(elem, mapper));
    } else {
      return Object.fromEntries(
        Object.entries(obj).map(([key, val]) => [
          key,
          mapObjectValueRecursivelySync(val, mapper),
        ])
      );
    }
  }
  return mappedValue;
};

export const mapObjectValueRecursively = (
  obj: any,
  mapper: (value: any) => any | Promise<any>
): Promise<any> => {
  return Promise.resolve(mapper(obj)).then((mappedValue) => {
    if (mappedValue === obj && typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        return Promise.all(
          obj.map((elem) => mapObjectValueRecursively(elem, mapper))
        );
      } else {
        return Promise.all(
          Object.entries(obj).map(([key, val]) =>
            mapObjectValueRecursively(val, mapper).then((fieldVal) => [
              key,
              fieldVal,
            ])
          )
        ).then((entries) => Object.fromEntries(entries));
      }
    }
    return mappedValue;
  });
};
