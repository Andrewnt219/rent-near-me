// import '@libs/react-datepicker/style.css';
import GlobalStyle from '@styles/GlobalStyles';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
import 'react-day-picker/lib/style.css';
import { GlobalStyles as TwinStyles } from 'twin.macro';

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
