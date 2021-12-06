import { Children, FC, isValidElement } from 'react';
import {
  Tabs as ReachTabs,
  TabsKeyboardActivation,
  TabsProps as ReachTabsProps,
  TabPanels as ReachTabPanels,
} from '@reach/tabs';
import TabHeader from './TabHeader';
import TabButton from './TabButton';
import {
  TabOptionContextValue,
  TabOptionProvider,
} from '../contexts/TabOptionContext';
import { LayoutGroup } from 'framer-motion';
import { useUuid } from '@hooks/useUuid';

type TabGroupProps = Omit<
  ReachTabsProps,
  'defaultIndex' | 'index' | 'onChange'
> &
  TabOptionContextValue & {
    /**
     * Starts the {@link TabGroup} at a specific index in uncontrolled mode.
     */
    defaultSelectedTab?: ReachTabsProps['defaultIndex'];
    /**
     * Uses by the parent component to control the currently selected Tab.
     *
     * Make sure to include the {@link TabGroupProps.onSelectedTabChange} prop or the currently selected tab won't change.
     */
    selectedTab?: ReachTabsProps['index'];
    /**
     * Invoked with the tab index when the user changes tabs, allowing the parent component to synchronize {@link TabGroupProps.selectedTab}
     */
    onSelectedTabChange?: ReachTabsProps['onChange'];
  };

/**
 * A container for a group of Tabs. Only one Tab will be active at a given time.
 */
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
  const tabId = useUuid();
  return (
    <TabOptionProvider options={{ theme, buttonJustify, buttonGap }}>
      <LayoutGroup id={`Tab-LayoutGroup-${tabId}`}>
        <ReachTabs
          keyboardActivation={TabsKeyboardActivation.Manual}
          defaultIndex={defaultSelectedTab}
          index={selectedTab}
          onChange={onSelectedTabChange}
          {...props}
        >
          <TabHeader>
            {Children.map(children, (child, index) =>
              isValidElement(child) ? (
                <TabButton index={index}>{child.props.label}</TabButton>
              ) : null
            )}
          </TabHeader>
          <ReachTabPanels>{children}</ReachTabPanels>
        </ReachTabs>
      </LayoutGroup>
    </TabOptionProvider>
  );
};

export default TabGroup;
