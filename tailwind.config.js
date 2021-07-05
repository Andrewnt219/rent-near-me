// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
    './src/ui/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    shadow: {
      DEFAULT: '0px 6px 16px rgb(0 0 0 / 12%)',
      sm: '0px 1px 2px rgb(0 0 0 / 8%), 0px 4px 12px rgb(0 0 0 / 5%)',
    },
    colors: {
      transparent: 'transparent',
      current: 'current',
      primary: {
        DEFAULT: '#ff385c',
        dark: '#bd1e59',
      },
      danger: '#dc2626',
      success: '#008A05',
      white: '#fff',
      black: '#000',
      light: '#f8f9fa',
      dark: '#333',
      red: {
        light: '#fff8f6',
      },
      gray: {
        DEFAULT: '#9ca3af',
        light: '#ddd',
        dark: '#717171',
      },
      facebook: '#1877f2',
    },
    extend: {
      maxWidth: {
        '8xl': '90rem',
      },

      borderRadius: {
        DEFAULT: '0.5rem',
      },

      borderColor: {
        DEFAULT: '#ddd',
      },

      fontFamily: {
        sans: ['Montserrat', ...fontFamily.sans],
      },

      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    centers,
    grid,
    sizing,
    commons,
    fonts,
    require('@tailwindcss/aspect-ratio'),
  ],
};

function commons({ addComponents }) {
  addComponents({
    '.content': {
      content: '""',
    },
  });
}

function fonts({ addComponents, theme }) {
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

function sizing({ addComponents, theme }) {
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
