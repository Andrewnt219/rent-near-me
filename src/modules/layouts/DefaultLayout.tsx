import Layout from './Layout';
import { LayoutProvider } from './contexts/LayoutModalContext';
import AppBar from './components/AppBar/AppBar';
import Footer from './components/Footer/Footer';
import HomeNavBar from './components/HomeNavBar/HomeNavBar';
import { PropsWithChildren } from 'react';

type Props = {
  className?: string;
};
const DefaultLayout = ({ className, children }: PropsWithChildren<Props>) => {
  return (
    <LayoutProvider>
      <Layout size="sm" tw="flex flex-col min-h-full relative">
        <HomeNavBar tw="hidden lg:block" />
        <AppBar tw="lg:hidden" />
        <Layout.Container as="main" tw="flex-1" className={className}>
          {children}
        </Layout.Container>
        <Footer tw="mb-var-app-bar-height lg:mb-0" />
      </Layout>
    </LayoutProvider>
  );
};

export default DefaultLayout;
