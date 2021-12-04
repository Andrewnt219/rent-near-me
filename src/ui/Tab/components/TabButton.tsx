import { FC, useEffect, useRef } from 'react';
import { Tab as ReachTab, TabProps as ReachTabProps } from '@reach/tabs';
import { useRect } from '@reach/rect';
import { useTabAnimation } from '../contexts/TabAnimationContext';
import {
  useTabOption,
  TabOptionContextValue,
} from '../contexts/TabOptionContext';
import tw from 'twin.macro';
import { useTabGroup } from '..';

type TabButtonProps = ReachTabProps;

/**
 * A button associated with a single Tab to activate that tab
 */
const TabButton: FC<TabButtonProps> = ({ children, ...props }) => {
  const { theme } = useTabOption();
  const { setSelectedButtonRect } = useTabAnimation();

  const { selectedTab } = useTabGroup();
  const isSelected = selectedTab === props.index;

  const ref = useRef<HTMLButtonElement>(null);
  const rect = useRect(ref, { observe: isSelected });

  useEffect(() => {
    if (isSelected) {
      setSelectedButtonRect(rect);
    }
  }, [isSelected, rect, setSelectedButtonRect]);

  return (
    <ReachTab
      css={`
        ${tw`text-button uppercase whitespace-nowrap`}
        ${isSelected && tw`font-semibold`}
        ${tw`flex-shrink-0 min-w-[3rem] px-0 py-3 border-b-0`}
        ${tw`focus-visible:(backdrop-filter backdrop-invert backdrop-opacity-5)`}
        ${getTabButtonThemeStyle(theme)}
      `}
      ref={ref}
      {...props}
    >
      {children}
    </ReachTab>
  );
};

/**
 * Getter for color styling of {@link TabButton} by theme
 */
const getTabButtonThemeStyle = (theme?: TabOptionContextValue['theme']) => {
  if (theme === 'secondary') {
    return tw`text-secondary`;
  }
  return tw`text-primary`;
};

export default TabButton;
