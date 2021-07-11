import { reactDatePickerCss } from '@libs/react-day-picker/react-day-picker-overide';
import 'react-day-picker/lib/style.css';
import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalStyles = createGlobalStyle`
  html,body, #__next {
   ${tw`w-full h-full text-dark`} 
  }

  input,text-area, select, ::placeholder {
    font: inherit;
  }

  #__next {
    ${tw`mx-auto relative`}
  }

  input, textarea, select {
    ${tw`bg-transparent outline-none`}
  }

  button, a {
    ${tw`outline-none! focus-visible:(ring ring-dark)`}
  }

  *, *::before, *::after {
    ${tw`outline-none!`}
    
    &:focus-visible {
      ${tw`ring-2 ring-dark`}
    }
  }

  
  ${reactDatePickerCss}

  
`;

export default GlobalStyles;
