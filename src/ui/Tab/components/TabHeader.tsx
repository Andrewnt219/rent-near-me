import { FC } from 'react';
import tw from 'twin.macro';
import {
  TabList as ReachTabList,
  TabListProps as ReachTabListProps,
} from '@reach/tabs';
import {
  useTabOption,
  TabOptionContextValue,
} from '../contexts/TabOptionContext';

type TabHeaderProps = ReachTabListProps;

const TabHeader: FC<TabHeaderProps> = ({ children, ...props }) => {
  const { buttonJustify, buttonGap } = useTabOption();
  return (
    <ReachTabList
      css={`
        ${tw`flex bg-transparent border-b-[1px] mb-lg`}
        ${tw`overflow-x-auto`}
          ${getTabHeaderAlignStyle(buttonJustify)}
          ${getTabHeaderGapStyle(buttonGap)}
      `}
      {...props}
    >
      {children}
    </ReachTabList>
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
