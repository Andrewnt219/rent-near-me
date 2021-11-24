import { CustomNextPage } from '@/next';
import DocsLayout from '@modules/layouts/DocsLayout';
import { TabGroup, Tab } from '@ui/Tab';

const TabDocsPage: CustomNextPage = () => {
  return (
    <TabGroup theme="secondary">
      <Tab label="Tab 1">Tab 1 content</Tab>
      <Tab label="Tab 2">Tab 2 content</Tab>
      <Tab label="Tab 3">Tab 3 content</Tab>
    </TabGroup>
  );
};

TabDocsPage.getLayout = DocsLayout.getLayout;

export default TabDocsPage;
