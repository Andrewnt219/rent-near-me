import { FC, useRef } from 'react';
import tw from 'twin.macro';
import { useRect } from '@reach/rect';
import {
  TabList as ReachTabList,
  TabListProps as ReachTabListProps,
} from '@reach/tabs';
import HorizontalScroll from '@ui/HorizontalScroll/HorizontalScroll';
import {
  useTabOption,
  TabOptionContextValue,
} from '../contexts/TabOptionContext';
import { TabAnimationProvider } from '../contexts/TabAnimationContext';
import SelectedTabIndicator from './SelectedTabIndicator';

type TabHeaderProps = ReachTabListProps;

const TabHeader: FC<TabHeaderProps> = ({ children, ...props }) => {
  const { buttonJustify, buttonGap } = useTabOption();
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRect(ref);
  return (
    <HorizontalScroll
      theme="secondary"
      tw="mb-lg"
      childrenWrapperCss={tw`border-b-[1px]`}
    >
      <TabAnimationProvider principleRect={rect}>
        <ReachTabList
          ref={ref}
          css={`
            ${tw`relative flex bg-transparent`}
            ${getTabHeaderAlignStyle(buttonJustify)}
            ${getTabHeaderGapStyle(buttonGap)}
          `}
          {...props}
        >
          {children}
          <SelectedTabIndicator />
        </ReachTabList>
      </TabAnimationProvider>
    </HorizontalScroll>
  );
};

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
