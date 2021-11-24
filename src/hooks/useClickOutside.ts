import { useEffect, useRef } from 'react';

type Handler = () => void;
const useClickOutside = <T extends HTMLElement>(handler: Handler) => {
  const ref = useRef<T>(null);

  const handlerRef = useRef<Handler>();
  handlerRef.current = handler;

  useEffect(() => {
    const element = ref.current;
    const handler = handlerRef.current;

    const handleClickOutside: EventListener = (e) => {
      const isOutside =
        element && e.target instanceof Element && !element.contains(e.target);

      if (isOutside && handler) {
        handler();
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('touchstart', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
    };
  }, []);

  return ref;
};

export default useClickOutside;
