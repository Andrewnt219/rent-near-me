import { reactDatePickerCss } from '@libs/react-day-picker/react-day-picker-overide';
import 'react-day-picker/lib/style.css';
import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalStyles = createGlobalStyle`  
  html,body, #__next {
   ${tw`w-full h-full text-gray-800 text-body1`} 
  }

  input,text-area, select, ::placeholder {
    font: inherit;
  }

  #__next {
    /* isolate to prevent affecting modals or portals */
    ${tw`mx-auto relative isolate`}
  }

  input, textarea, select {
    ${tw`bg-transparent outline-none`}
  }
  
  ${reactDatePickerCss}

  * {
    ${tw`focus:outline-none!`}
  }

  
`;

export default GlobalStyles;
