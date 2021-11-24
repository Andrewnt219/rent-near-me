import { Children, FC, isValidElement, useRef } from 'react';
import {
  Tabs as ReachTabs,
  TabsKeyboardActivation,
  TabsProps as ReachTabsProps,
  TabPanels as ReachTabPanels,
} from '@reach/tabs';
import { useRect } from '@reach/rect';
import TabHeader from './TabHeader';
import TabButton from './TabButton';
import SelectedTabIndicator from './SelectedTabIndicator';
import {
  TabOptionContextValue,
  TabOptionProvider,
} from '../contexts/TabOptionContext';
import { TabAnimationProvider } from '../contexts/TabAnimationContext';

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
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRect(ref);

  return (
    <TabOptionProvider options={{ theme, buttonJustify, buttonGap }}>
      <TabAnimationProvider tabGroupRect={rect}>
        <ReachTabs
          ref={ref}
          keyboardActivation={TabsKeyboardActivation.Manual}
          defaultIndex={defaultSelectedTab}
          index={selectedTab}
          onChange={onSelectedTabChange}
          tw="relative"
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
          <SelectedTabIndicator />
        </ReachTabs>
      </TabAnimationProvider>
    </TabOptionProvider>
  );
};

export default TabGroup;
