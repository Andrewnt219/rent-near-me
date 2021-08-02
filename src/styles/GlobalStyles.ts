import { reactDatePickerCss } from '@libs/react-day-picker/react-day-picker-overide';
import 'react-day-picker/lib/style.css';
import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary:  255, 56, 92;
    --primary-dark: 189, 30, 89;

    --secondary: 0, 132, 137;

    --danger: 220, 38, 38;
    --success: 0, 138, 5;
    --info: 0, 123, 255;
    --light: 247, 247, 247;
    --dark: 51, 51, 51;
    --gray: 156, 163, 175; 
    
    --border-color: 221, 221, 221;
  }

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
  
  ${reactDatePickerCss}

  * {
    ${tw`focus:outline-none!`}
  }

  
`;

export default GlobalStyles;
