import { FC, useRef, useCallback, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { IconButtonGhost } from '@ui/IconButton/IconButton';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import useOverflow from '@hooks/useOverflow';
import { CSSProp } from 'styled-components';
import tw from 'twin.macro';
import { hideScrollbar } from '@styles/GlobalStyles';

type HorizontalScrollProps = {
  theme: 'regular' | 'primary' | 'secondary';
  childrenWrapperCss?: CSSProp;
};

const HorizontalScroll: FC<HorizontalScrollProps> = ({
  theme = 'regular',
  childrenWrapperCss,
  children,
  ...props
}) => {
  const childWrapperRef = useRef<HTMLDivElement>(null);
  const childWrapper = childWrapperRef.current;
  const { isOverFlowingX } = useOverflow(childWrapperRef);
  const [isOnLeftEdge, setIsOnLeftEdege] = useState(true);
  const [isOnRightEdge, setIsOnRighttEdege] = useState(false);

  const onScroll = useCallback(() => {
    const childWrapper = childWrapperRef.current;
    if (childWrapper) {
      setIsOnLeftEdege(childWrapper.scrollLeft === 0);
      setIsOnRighttEdege(
        childWrapper.scrollLeft + childWrapper.offsetWidth >=
          childWrapper.scrollWidth
      );
    }
  }, [childWrapperRef]);

  const onScrollLeft = useCallback(() => {
    childWrapper?.scrollBy({ behavior: 'smooth', left: -25 });
    onScroll();
  }, [childWrapper, onScroll]);

  const onScrollRight = useCallback(() => {
    childWrapper?.scrollBy({ behavior: 'smooth', left: 25 });
    onScroll();
  }, [childWrapper, onScroll]);

  useEffect(() => {
    childWrapper?.addEventListener('scroll', onScroll, true);
    return () => {
      childWrapper?.removeEventListener('scroll', onScroll, true);
    };
  }, [childWrapper, onScroll]);

  return (
    <div tw="flex items-center gap-xs" {...props}>
      {isOverFlowingX && !isOnLeftEdge && (
        <IconButtonGhost
          size="md"
          tw="flex-shrink-0"
          css={getScrollButtonThemeStyle(theme)}
          onClick={onScrollLeft}
        >
          <span tw="sr-only">Scroll left</span>
          <Icon icon={arrowIosBackFill} />
        </IconButtonGhost>
      )}
      <div
        ref={childWrapperRef}
        css={`
          ${tw`flex-grow overflow-x-auto`}
          ${childrenWrapperCss}
          ${hideScrollbar}
        `}
      >
        {children}
      </div>
      {isOverFlowingX && !isOnRightEdge && (
        <IconButtonGhost
          size="md"
          tw="flex-shrink-0"
          css={getScrollButtonThemeStyle(theme)}
          onClick={onScrollRight}
        >
          <span tw="sr-only">Scroll right</span>
          <Icon icon={arrowIosForwardFill} />
        </IconButtonGhost>
      )}
    </div>
  );
};

const getScrollButtonThemeStyle = (theme: HorizontalScrollProps['theme']) => {
  if (theme === 'primary') {
    return tw`text-primary`;
  }
  if (theme === 'secondary') {
    return tw`text-secondary`;
  }
  return tw``;
};

export default HorizontalScroll;
