import { PropsWithChildren } from 'react';
import Layout from './Layout';
import AppBar from './components/AppBar/AppBar';
import Footer from './components/Footer/Footer';
import HomeNavBar from './components/HomeNavBar/HomeNavBar';

type DefaultLayoutProps = PropsWithChildren<{
  className?: string;
}>;

function DefaultLayout({ className, children }: DefaultLayoutProps) {
  return (
    <Layout size="sm" tw="flex flex-col min-h-full relative">
      <HomeNavBar tw="hidden lg:block" />
      <AppBar tw="lg:hidden" />
      <Layout.Container as="main" tw="flex-1" className={className}>
        {children}
      </Layout.Container>
      <Footer tw="mb-var-app-bar-height lg:mb-0" />
    </Layout>
  );
}

export default DefaultLayout;
