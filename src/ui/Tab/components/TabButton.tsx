import { FC } from 'react';
import { Tab as ReachTab, TabProps as ReachTabProps } from '@reach/tabs';
import {
  useTabOption,
  TabOptionContextValue,
} from '../contexts/TabOptionContext';
import tw from 'twin.macro';
import { useTabGroup } from '..';
import SelectedIndicator from './SelectedIndicator';

type TabButtonProps = ReachTabProps;

/**
 * A button associated with a single Tab to activate that tab
 */
const TabButton: FC<TabButtonProps> = ({ children, ...props }) => {
  const { theme } = useTabOption();
  const { selectedTab } = useTabGroup();

  const isSelected = selectedTab === props.index;
  return (
    <ReachTab
      css={`
        ${tw`relative shrink-0`}
        ${tw`min-w-[3rem] px-0 py-3 border-b-0`}
        ${tw`text-button uppercase whitespace-nowrap`}
        ${tw`focus-visible:(backdrop-filter backdrop-invert backdrop-opacity-5)`}
        ${getTabButtonThemeStyle(theme)}
      `}
      {...props}
    >
      {children}
      {isSelected && <SelectedIndicator layoutId="Tab-SelectedIndicator" />}
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
