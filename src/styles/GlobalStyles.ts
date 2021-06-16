import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalStyles = createGlobalStyle`
  #__next {
    ${tw`bg-red-100`}
  }
`;

export default GlobalStyles;
