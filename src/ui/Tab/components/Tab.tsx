import { FC, ReactNode } from 'react';
import {
  TabPanel as ReachTabPanel,
  TabPanelProps as ReachTabPanelProps,
} from '@reach/tabs';

type TabProps = ReachTabPanelProps & {
  label: ReactNode;
};

const Tab: FC<TabProps> = (props) => (
  <ReachTabPanel tabIndex={-1} {...props}></ReachTabPanel>
);

export default Tab;
