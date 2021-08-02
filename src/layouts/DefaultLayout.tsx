import Layout from '@layouts/Layout';
import AppBar from '@ui/navigation/AppBar/AppBar';
import Footer from '@ui/navigation/Footer/Footer';
import HomeNavBar from '@ui/navigation/HomeNavBar/HomeNavBar';
import { PropsWithChildren } from 'react';

type Props = {
  className?: string;
};
const DefaultLayout = ({ className, children }: PropsWithChildren<Props>) => {
  return (
    <Layout
      size="lg"
      tw="flex flex-col min-h-full relative pb-var-app-bar lg:pb-0"
    >
      <HomeNavBar tw="hidden lg:block" />
      <AppBar tw="lg:hidden" />
      <Layout.Container as="main" tw="flex-1" className={className}>
        {children}
      </Layout.Container>
      <Footer />
    </Layout>
  );
};

export default DefaultLayout;
