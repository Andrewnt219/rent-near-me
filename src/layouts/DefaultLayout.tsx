import AppBar from '@ui/navigation/AppBar/AppBar';
import Footer from '@ui/navigation/Footer/Footer';
import HomeNavBar from '@ui/navigation/HomeNavBar/HomeNavBar';
import { PropsWithChildren } from 'react';

type Props = {
  className?: string;
};
const DefaultLayout = ({ className, children }: PropsWithChildren<Props>) => {
  return (
    <div
      tw="col-span-full flex flex-col min-h-full relative"
      className={className}
    >
      <HomeNavBar />
      <AppBar />

      <main tw="flex-1">{children}</main>

      <Footer />
    </div>
  );
};

export default DefaultLayout;
