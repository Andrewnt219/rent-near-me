import { FC, ReactNode } from 'react';
import {
  TabPanel as ReachTabPanel,
  TabPanelProps as ReachTabPanelProps,
} from '@reach/tabs';

type TabProps = ReachTabPanelProps & {
  /**
   * Label of the tab panel to be displayed in the TabButton
   */
  label: ReactNode;
  /**
   * **Do not use!**
   * @deprecated Unsupported prop for the purpose of this project
   */
  index?: never;
};

/**
 * A single tab panel within a TabGroup.
 *
 * @example
 * Use text for label
 * ```jsx
 * <Tab label="Tab label">Tab content</Tab>
 * ```
 *
 * Use JSX for label
 * ```jsx
 * <Tab label={
 *  <div tw="flex items-center">
 *    <Icon icon={someIcon} />
 *    <span>Tab label</span>
 *  </div>
 * }>Tab content</Tab>
 * ```
 */
const Tab: FC<TabProps> = (props) => (
  <ReachTabPanel tabIndex={-1} {...props}></ReachTabPanel>
);

export default Tab;
