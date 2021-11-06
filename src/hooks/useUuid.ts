import { nanoid } from 'nanoid';
import { useRef } from 'react';

export const useUuid = (size = 8) => {
  const idRef = useRef(nanoid(size));

  return idRef.current;
};
