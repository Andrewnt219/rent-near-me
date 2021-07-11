import { FC, useState } from 'react';
import Layout from '@layouts/Layout';
import AppBar from '@ui/navigation/AppBar/AppBar';
import Footer from '@ui/navigation/Footer/Footer';
import HomeNavBar from '@ui/navigation/HomeNavBar/HomeNavBar';

type DefaultLayoutProps = {
  className?: string;
};
const DefaultLayout: FC<DefaultLayoutProps> = ({ className, children }) => {
  return (
    <Layout
      size="lg"
      tw="flex flex-col min-h-full relative pb-var-app-bar lg:pb-0"
      className={className}
    >
      <HomeNavBar tw="hidden lg:block" />
      <AppBar tw="lg:hidden" />
      <Layout.Container as="main" tw="flex-1">
        {children}
      </Layout.Container>
      <Footer />
    </Layout>
  );
};

export default DefaultLayout;
