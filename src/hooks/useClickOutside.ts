import { RefObject, useCallback, useEffect } from 'react';

type Handler = () => void;
const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: Handler
) => {
  const element = ref.current;
  const handleClickOutside: EventListener = useCallback(
    (e) => {
      const isOutside =
        element && e.target instanceof Element && !element.contains(e.target);

      isOutside && handler();
    },
    [element, handler]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('touchstart', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return ref;
};

export default useClickOutside;
