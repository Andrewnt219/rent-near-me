// import '@libs/react-datepicker/style.css';
import GlobalStyle from '@styles/GlobalStyles';
import type { AppProps } from 'next/app';
import 'react-day-picker/lib/style.css';
import { GlobalStyles as TwinStyles } from 'twin.macro';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <TwinStyles />
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
