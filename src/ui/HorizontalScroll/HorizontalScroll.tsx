import { FC, useRef, useCallback, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import useOverflow from '@hooks/useOverflow';
import { CSSProp } from 'styled-components';
import tw from 'twin.macro';
import { hideScrollbar } from '@styles/GlobalStyles';
import { ButtonGhost } from '@ui/Button';

type HorizontalScrollProps = {
  /**
   * Theme of the {@link HorizontalScroll}
   */
  theme: 'regular' | 'primary' | 'secondary';
  /**
   * Styles applied to the wrapper of the overflowable children
   */
  childrenWrapperCss?: CSSProp;
};

/**
 * A scroll mechanism with arrow buttons for horizontally overflowable element.
 * The mechanism only kicks in when the `children` element overflows.
 */
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
      {isOverFlowingX && (
        <ButtonGhost
          icon
          size="md"
          tw="shrink-0"
          css={getScrollButtonThemeStyle(theme)}
          style={{
            visibility: isOnLeftEdge ? 'hidden' : 'visible',
          }}
          onClick={onScrollLeft}
        >
          <span tw="sr-only">Scroll left</span>
          <Icon icon={arrowIosBackFill} />
        </ButtonGhost>
      )}
      <div
        ref={childWrapperRef}
        css={`
          ${tw`grow overflow-x-auto`}
          ${childrenWrapperCss}
          ${hideScrollbar}
        `}
      >
        {children}
      </div>
      {isOverFlowingX && (
        <ButtonGhost
          icon
          size="md"
          tw="shrink-0"
          css={getScrollButtonThemeStyle(theme)}
          style={{
            visibility: isOnRightEdge ? 'hidden' : 'visible',
          }}
          onClick={onScrollRight}
        >
          <span tw="sr-only">Scroll right</span>
          <Icon icon={arrowIosForwardFill} />
        </ButtonGhost>
      )}
    </div>
  );
};

/**
 * Getter for color styling of {@link HorizontalScroll} by theme
 */
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
