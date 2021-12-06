import { MutableRefObject, RefObject, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import useResizeObserver from 'use-resize-observer';

const useOverflow = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [isOverFlowingX, setIsOverflowingX] = useState(false);
  const [isOverflowingY, setIsOverflowingY] = useState(false);

  const onResize = useMemo(
    () =>
      debounce(() => {
        const element = ref.current;
        if (element) {
          setIsOverflowingX(element.scrollWidth > element.clientWidth);
          setIsOverflowingY(element.scrollHeight > element.clientHeight);
        }
      }, 300),
    [ref]
  );

  useResizeObserver({
    ref,
    onResize,
  });

  return {
    isOverFlowingX,
    isOverflowingY,
  };
};

export default useOverflow;
