import { reactDatePickerCss } from '@libs/react-day-picker/react-day-picker-overide';
import 'react-day-picker/lib/style.css';
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
    ${tw`max-w-7xl mx-auto`}
  }
  
  ${reactDatePickerCss}

  
`;

export default GlobalStyles;
