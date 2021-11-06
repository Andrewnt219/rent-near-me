import { GetLayout } from '@common-types';
import { AuthProvider } from '@modules/user-auth/contexts/AuthContext';
import '@reach/dialog/styles.css';
import GlobalStyle from '@styles/GlobalStyles';
import { SnackbarProvider } from '@ui/Snackbar/SnackbarContext';
import type { AppProps } from 'next/app';
import 'react-day-picker/lib/style.css';
import { GlobalStyles as TwinStyles } from 'twin.macro';

type Page = AppProps['Component'] & {
  getLayout?: GetLayout;
};
function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as Page).getLayout ?? ((page) => page);

  return (
    <AuthProvider>
      <SnackbarProvider>
        <TwinStyles />
        <GlobalStyle />
        {getLayout(<Component {...pageProps} />)}
      </SnackbarProvider>
    </AuthProvider>
  );
}
export default MyApp;
