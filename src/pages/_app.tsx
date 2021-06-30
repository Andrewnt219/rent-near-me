// import '@libs/react-datepicker/style.css';
import GlobalStyle from '@styles/GlobalStyles';
import type { AppProps } from 'next/app';
import 'react-datepicker/dist/react-datepicker.css';
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
