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
 */
const Tab: FC<TabProps> = (props) => (
  <ReachTabPanel tabIndex={-1} {...props}></ReachTabPanel>
);

export default Tab;
