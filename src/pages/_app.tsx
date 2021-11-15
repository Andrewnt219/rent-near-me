import type { AppProps } from 'next/app';
import SWRDefaultConfigProvider from '@libs/swr/SWRDefaultConfigProvider';
import { AuthProvider } from '@modules/user-auth/contexts/AuthContext';
import GlobalStyle from '@styles/GlobalStyles';
import { SnackbarProvider } from '@ui/Snackbar/SnackbarContext';
import { GlobalStyles as TwinStyles } from 'twin.macro';
import '@libs/dayjs/plugins';
import '@libs/axios/interceptors';
import '@reach/dialog/styles.css';
import 'react-day-picker/lib/style.css';
import { ModalProvider } from '@ui/Modal/ModalContext';
import { NextPageWithLayout } from '@/next';

type MyAppProps = {
  Component: NextPageWithLayout;
  pageProps: AppProps['pageProps'];
};

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SWRDefaultConfigProvider>
      <AuthProvider>
        <SnackbarProvider>
          <ModalProvider>
            <TwinStyles />
            <GlobalStyle />
            {getLayout(<Component {...pageProps} />)}
          </ModalProvider>
        </SnackbarProvider>
      </AuthProvider>
    </SWRDefaultConfigProvider>
  );
}

export default MyApp;
