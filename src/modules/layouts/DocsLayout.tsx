import { NextLayout } from '@/next';
import { ReactNode } from 'react';
import Layout from './Layout';

const DocsLayout: NextLayout = ({ children }) => (
  <Layout size="sm">
    <Layout.Container as="main" tw="flex-1">
      {children}
    </Layout.Container>
  </Layout>
);

DocsLayout.getLayout = (page: ReactNode) => <DocsLayout>{page}</DocsLayout>;

export default DocsLayout;
