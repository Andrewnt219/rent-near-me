// import '@libs/react-datepicker/style.css';
import { ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { GlobalStyles as TwinStyles } from 'twin.macro';
import GlobalStyle from '@styles/GlobalStyles';
import 'react-day-picker/lib/style.css';
import '@reach/dialog/styles.css';

type Page = AppProps['Component'] & {
  WithLayout?(page: ReactNode): ReactNode;
};
function MyApp({ Component, pageProps }: AppProps) {
  const WithLayout = (Component as Page).WithLayout ?? ((page: Page) => page);

  return (
    <>
      <TwinStyles />
      <GlobalStyle />
      {WithLayout(<Component {...pageProps} />)}
    </>
  );
}
export default MyApp;
