// import '@libs/react-datepicker/style.css';
import { GetLayout } from '@common-types';
import { AuthProvider } from '@contexts/AuthContext';
import '@reach/dialog/styles.css';
import GlobalStyle from '@styles/GlobalStyles';
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
      <TwinStyles />
      <GlobalStyle />
      {getLayout(<Component {...pageProps} />)}
    </AuthProvider>
  );
}
export default MyApp;
