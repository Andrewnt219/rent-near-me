import {
  Tabs as ReachTabs,
  TabsKeyboardActivation,
  TabsProps as ReachTabsProps,
  TabPanels as ReachTabPanels,
} from '@reach/tabs';
import { Children, FC, isValidElement } from 'react';
import TabHeader from './TabHeader';
import TabButton from './TabButton';
import {
  TabOptionContextValue,
  TabOptionProvider,
} from '../contexts/TabOptionContext';

type TabGroupProps = Omit<
  ReachTabsProps,
  'defaultIndex' | 'index' | 'onChange'
> &
  TabOptionContextValue & {
    defaultSelectedTab?: ReachTabsProps['defaultIndex'];
    selectedTab?: ReachTabsProps['index'];
    onSelectedTabChange?: ReachTabsProps['onChange'];
  };

const TabGroup: FC<TabGroupProps> = ({
  theme,
  buttonJustify,
  buttonGap,
  defaultSelectedTab,
  selectedTab,
  onSelectedTabChange,
  children,
  ...props
}) => {
  return (
    <TabOptionProvider options={{ theme, buttonJustify, buttonGap }}>
      <ReachTabs
        keyboardActivation={TabsKeyboardActivation.Manual}
        defaultIndex={defaultSelectedTab}
        index={selectedTab}
        onChange={onSelectedTabChange}
        {...props}
      >
        <TabHeader>
          {Children.map(children, (child) =>
            isValidElement(child) ? (
              <TabButton>{child.props.label}</TabButton>
            ) : null
          )}
        </TabHeader>
        <ReachTabPanels>{children}</ReachTabPanels>
      </ReachTabs>
    </TabOptionProvider>
  );
};

export default TabGroup;
