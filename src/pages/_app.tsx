// import '@libs/react-datepicker/style.css';
import { WithLayout } from '@common-types';
import { AuthProvider } from '@contexts/AuthContext';
import '@reach/dialog/styles.css';
import GlobalStyle from '@styles/GlobalStyles';
import type { AppProps } from 'next/app';
import 'react-day-picker/lib/style.css';
import { GlobalStyles as TwinStyles } from 'twin.macro';

type Page = AppProps['Component'] & {
  WithLayout?: WithLayout;
};
function MyApp({ Component, pageProps }: AppProps) {
  const WithLayout = (Component as Page).WithLayout ?? ((page) => page);

  return (
    <AuthProvider>
      <TwinStyles />
      <GlobalStyle />
      {WithLayout(<Component {...pageProps} />)}
    </AuthProvider>
  );
}
export default MyApp;
