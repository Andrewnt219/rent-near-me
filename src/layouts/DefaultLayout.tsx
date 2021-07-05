import Layout from '@layouts/Layout';
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
      tw="flex flex-col min-h-full relative"
      className={className}
    >
      <HomeNavBar />
      {/* <AppBar /> */}

      <Layout.Container as="main" tw="flex-1">
        {children}
      </Layout.Container>

      <Footer />
    </Layout>
  );
};

export default DefaultLayout;
