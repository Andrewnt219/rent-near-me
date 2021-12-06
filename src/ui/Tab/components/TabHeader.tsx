import { FC } from 'react';
import tw from 'twin.macro';
import {
  TabList as ReachTabList,
  TabListProps as ReachTabListProps,
} from '@reach/tabs';
import HorizontalScroll from '@ui/HorizontalScroll/HorizontalScroll';
import {
  useTabOption,
  TabOptionContextValue,
} from '../contexts/TabOptionContext';

type TabHeaderProps = ReachTabListProps;

/**
 * A container for a group of TabButtons. Only one TabButton will be active at a given time.
 */
const TabHeader: FC<TabHeaderProps> = ({ children, ...props }) => {
  const { buttonJustify, buttonGap } = useTabOption();
  return (
    <HorizontalScroll
      theme="secondary"
      tw="mb-lg"
      childrenWrapperCss={tw`border-b-[1px]`}
    >
      <ReachTabList
        css={`
          ${tw`flex bg-transparent`}
          ${getTabHeaderAlignStyle(buttonJustify)}
          ${getTabHeaderGapStyle(buttonGap)}
        `}
        {...props}
      >
        {children}
      </ReachTabList>
    </HorizontalScroll>
  );
};

/**
 * Getter for alignment styling of {@link TabHeader} by justify-mode
 */
const getTabHeaderAlignStyle = (
  justify?: TabOptionContextValue['buttonJustify']
) => {
  switch (justify) {
    case 'right':
      return tw`justify-end`;
    case 'center':
      return tw`justify-center`;
    case 'between':
      return tw`justify-between`;
    case 'around':
      return tw`justify-around`;
    default:
      return tw`justify-start`;
  }
};

/**
 * Getter for gap styling of {@link TabHeader} by gap
 */
const getTabHeaderGapStyle = (gap?: TabOptionContextValue['buttonGap']) => {
  switch (gap) {
    case 'xs':
      return tw`gap-xs`;
    case 'sm':
      return tw`gap-sm`;
    case 'lg':
      return tw`gap-lg`;
    case 'xl':
      return tw`gap-xl`;
    default:
      return tw`gap-md`;
  }
};

export default TabHeader;
