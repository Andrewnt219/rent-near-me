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
import { useId } from '@radix-ui/react-id';

type TabGroupProps = Omit<
  ReachTabsProps,
  'defaultIndex' | 'index' | 'onChange'
> &
  TabOptionContextValue & {
    /**
     * Starts the {@link TabGroup} at a specific index (0-based) in uncontrolled mode.
     */
    defaultSelectedTab?: ReachTabsProps['defaultIndex'];
    /**
     * The index of the currenly selected Tab (start from 0).
     *
     * Used by the parent component to control the currently selected Tab.
     *
     * Make sure to include the {@link TabGroupProps.onSelectedTabChange} prop or the currently selected tab won't change.
     */
    selectedTab?: ReachTabsProps['index'];
    /**
     * Invoked with the new Tab's index when the user changes tab, allowing the parent component to synchronize {@link TabGroupProps.selectedTab}
     */
    onSelectedTabChange?: ReachTabsProps['onChange'];
  };

/**
 * A container for a group of Tabs. Only one Tab will be active at a given time.
 *
 * @example
 * **Uncontrolled mode**
 *
 * ```jsx
 * <TabGroup>
 *  <Tab label="Tab 1">Tab 1 content</Tab>
 *  <Tab label="Tab 2">Tab 2 content</Tab>
 *  <Tab label="Tab 3">Tab 3 content</Tab>
 * </TabGroup>
 * ```
 *
 * @example
 * **Controlled mode**
 *
 * ```jsx
 * const [tab, setTab] = useState(0);
 *
 * <TabGroup selectedTab={tab} onSelectedTabChange={setTab}>
 *  <Tab label="Tab 1">Tab 1 content</Tab>   // index 0
 *  <Tab label="Tab 2">Tab 2 content</Tab>   // index 1
 *  <Tab label="Tab 3">Tab 3 content</Tab>   // index 2
 * </TabGroup>
 * ```
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
  const tabId = useId();
  return (
    <TabOptionProvider options={{ theme, buttonJustify, buttonGap }}>
      <LayoutGroup id={`tab-layoutGroup-${tabId}`}>
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
