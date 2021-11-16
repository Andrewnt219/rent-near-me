import { FC } from 'react';
import Layout from './Layout';

const DocsLayout: FC = ({ children }) => (
  <Layout size="sm">
    <Layout.Container as="main" tw="flex-1">
      {children}
    </Layout.Container>
  </Layout>
);

export default DocsLayout;
