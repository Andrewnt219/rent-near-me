import { CustomNextPage } from '@/next';
import DocsLayout from '@modules/layouts/DocsLayout';
import {
  TabSection,
  TabHeader,
  TabButton,
  TabBody,
  TabContent,
} from '@ui/Tab/Tab';

const TabDocsPage: CustomNextPage = () => {
  return (
    <div>
      <input />
      <TabSection theme="secondary">
        <TabHeader>
          <TabButton>Tab one</TabButton>
          <TabButton>Tab two</TabButton>
          <TabButton>Tab three</TabButton>
        </TabHeader>
        <TabBody>
          <TabContent>Tab 1 content</TabContent>
          <TabContent>Tab 2 content</TabContent>
          <TabContent>Tab 3 content</TabContent>
        </TabBody>
      </TabSection>
    </div>
  );
};

TabDocsPage.getLayout = DocsLayout.getLayout;

export default TabDocsPage;
