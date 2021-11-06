import type { AppProps } from 'next/app';
import { PageWithLayout } from '@common-types';
import SWRDefaultConfigProvider from '@libs/swr/SWRDefaultConfigProvider';
import { AuthProvider } from '@modules/user-auth/contexts/AuthContext';
import GlobalStyle from '@styles/GlobalStyles';
import { SnackbarProvider } from '@ui/Snackbar/SnackbarContext';
import { GlobalStyles as TwinStyles } from 'twin.macro';
import '@libs/dayjs/plugins';
import '@reach/dialog/styles.css';
import 'react-day-picker/lib/style.css';

type MyAppProps = {
  Component: PageWithLayout;
  pageProps: AppProps['pageProps'];
};

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SWRDefaultConfigProvider>
      <AuthProvider>
        <SnackbarProvider>
          <TwinStyles />
          <GlobalStyle />
          {getLayout(<Component {...pageProps} />)}
        </SnackbarProvider>
      </AuthProvider>
    </SWRDefaultConfigProvider>
  );
}

export default MyApp;
