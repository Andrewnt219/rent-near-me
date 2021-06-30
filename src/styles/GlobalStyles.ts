import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalStyles = createGlobalStyle`
  html,body {
   ${tw`w-full h-full text-dark`} 
  }

  input,text-area, select, ::placeholder {
    font: inherit;
  }

  #__next {
    ${tw``}
  }
  

  
`;

export default GlobalStyles;
