import { throttle } from 'lodash';
import { useEffect, useState } from 'react';

export function useScrollUp() {
  const [isScrollUp, setIsScrollUp] = useState<boolean>(true);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const onScroll = throttle(() => {
      setIsScrollUp(scrollY <= lastScrollY);

      lastScrollY = scrollY > 0 ? scrollY : 0;
    }, 300);

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return isScrollUp;
}
