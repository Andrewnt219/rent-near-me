import { Id } from '@common-types';
import { useMemo, useState } from 'react';

export const useQueue = <T extends { id: Id }>() => {
  const [items, setItems] = useState<T[]>([]);

  return useMemo(() => {
    const enqueue = (item: T) => setItems((prev) => prev.concat(item));
    const dequeue = () => setItems((prev) => prev.slice(1));
    const remove = (id: Id) =>
      setItems((prev) => prev.filter((item) => item.id !== id));

    return {
      enqueue,
      dequeue,
      remove,
      items,
    };
  }, [items]);
};
