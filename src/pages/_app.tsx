import type { CustomNextPage } from '@/next';
import type { AppProps } from 'next/app';
import { IdProvider as RadixIdProvider } from '@radix-ui/react-id';
import SWRDefaultConfigProvider from '@libs/swr/SWRDefaultConfigProvider';
import { AuthProvider } from '@modules/user-auth/contexts/AuthContext';
import { ModalProvider } from '@ui/Modal/ModalContext';
import { SnackbarProvider } from '@ui/Snackbar/SnackbarContext';
import GlobalStyle from '@styles/GlobalStyles';
import { GlobalStyles as TwinStyles } from 'twin.macro';
import '@libs/dayjs/plugins';
import '@libs/axios/interceptors';
import 'react-day-picker/lib/style.css';
import '@reach/dialog/styles.css';
import '@reach/tabs/styles.css';

type MyAppProps = AppProps & {
  Component: CustomNextPage;
};

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <RadixIdProvider>
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
    </RadixIdProvider>
  );
}

export default MyApp;
