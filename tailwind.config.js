// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme');

const getBorderColor = (theme) => ({
  DEFAULT: theme('colors.gray.300'),
  light: theme('colors.gray.100'),
  dark: theme('colors.gray.800'),
});

const getBackgroundColor = (theme) => ({
  light: theme('colors.gray.100'),
  dark: theme('colors.gray.900'),
});

const getTextColor = (theme) => ({
  muted: theme('colors.gray.600'),
});

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
    './src/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    boxShadow: {
      DEFAULT: 'rgb(145 158 171 / 24%) 0px 1px 2px 0px',
      z1: 'rgb(145 158 171 / 24%) 0px 1px 2px 0px',
      z8: 'rgb(145 158 171 / 24%) 0px 8px 16px 0px',
      z12: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 12px 24px 0px',
      z16: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',
      z20: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 20px 40px -4px',
      z24: 'rgb(145 158 171 / 24%) 0px 0px 4px 0px, rgb(145 158 171 / 24%) 0px 24px 48px 0px',
      primary: 'rgb(220 48 79 / 24%) 0px 8px 16px 0px',
      secondary: 'rgb(0 132 137 / 24%) 0px 8px 16px 0px',
      success: 'rgb(20 136 71 / 24%) 0px 8px 16px 0px',
      info: 'rgb(38 99 255 / 24%) 0px 8px 16px 0px',
      warning: 'rgb(172 100 12 / 24%) 0px 8px 16px 0px',
      danger: 'rgb(188 30 93 / 24%) 0px 8px 16px 0px',
    },
    fontSize: {
      h1: ['clamp(2.5rem, 2.2rem + 1.5vw, 4rem)', '1.25'], // 40px ~ 64px
      h2: ['clamp(2rem, 1.8rem + 1vw, 3rem)', '1.33333'], // 32px ~ 48px
      h3: ['clamp(1.5rem, 1.4rem + 0.5vw, 2rem);', '1.5'], // 24px ~ 32px
      h4: ['clamp(1.25rem, 1.2rem + 0.25vw, 1.5rem)', '1.5'], // 20px ~ 24px
      h5: ['clamp(1.125rem, 1.1rem + 0.125vw, 1.25rem)', '1.5'], // 18px ~ 20px
      h6: ['clamp(1.0625rem, 1.05rem + 0.0625vw, 1.125rem)', '1.55556'], // 17px ~ 18 px
      body1: ['1rem', '1.5'],
      body2: ['0.875rem', '1.57143'],
      caption: ['0.75rem', '1.5'],
      overline: ['0.75rem', '1.5'],
      button: ['0.875rem', '1.71429'],
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000',
      primary: {
        DEFAULT: '#DC304F',
        light: '#FDDDD5',
        dark: '#9E1849',
        text: '#69093E',
      },
      secondary: {
        DEFAULT: '#008489',
        light: '#C7F9EA',
        dark: '#004E62',
        text: '#002941',
      },
      success: {
        DEFAULT: '#148847',
        light: '#CEF9D0',
        dark: '#0A6142',
        text: '#034137',
      },
      info: {
        DEFAULT: '#2663FF',
        light: '#D3E4FF',
        dark: '#1337B7',
        text: '#071A7A',
      },
      warning: {
        DEFAULT: '#ac640c',
        light: '#FAEECC',
        dark: '#7B3C06',
        text: '#521F02',
      },
      danger: {
        DEFAULT: '#BC1E5D',
        light: '#FBD1D1',
        dark: '#870F56',
        text: '#5A0549',
      },
      gray: {
        100: '#F9FAFB',
        200: '#F4F6F8',
        300: '#DFE3E8',
        400: '#C4CDD5',
        500: '#919EAB',
        600: '#637381',
        700: '#454F5B',
        800: '#212B36',
        900: '#161C24',
      },
    },

    extend: {
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '3rem',
        'var-app-bar-height': 'var(--app-bar-height)',
        'var-page-px': 'var(--page-px)',
      },

      maxWidth: {
        '8xl': '90rem',
        'var-page-max-width': 'var(--page-max-width, 90rem)',
      },

      borderRadius: {
        DEFAULT: '0.25rem',
      },

      borderColor: getBorderColor,
      backgroundColor: getBackgroundColor,
      textColor: getTextColor,
      divideColor: getBorderColor,
      placeholderColor: getTextColor,
      ringColor: getBorderColor,

      fontFamily: {
        sans: ['Public Sans', ...fontFamily.sans],
      },
    },
  },
  plugins: [centers, grid, sizing, commons, fonts],
};

function commons({ addComponents }) {
  addComponents({
    '.content': {
      content: '""',
    },
  });
}

function fonts({ addComponents }) {
  addComponents({
    '.font-inherit': {
      font: 'inherit',
    },
    '.text-smaller': {
      fontSize: 'smaller',
    },
    '.text-larger': {
      fontSize: 'larger',
    },
  });
}

function centers({ addComponents }) {
  addComponents({
    '.position-center': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    '.flex-center': {
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
    },
  });
}

function grid({ addComponents }) {
  addComponents({
    '.grid-p-sm': {
      'grid-column': '2/12',
    },
    '.grid-p-md': {
      'grid-column': '4/10',
    },
    '.grid-p-lg': {
      'grid-column': '6/8',
    },
  });
}

function sizing({ addComponents }) {
  addComponents({
    '.absolute-cover': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    '.img-absolute': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center center',
    },
  });
}
