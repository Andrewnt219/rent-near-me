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
      primary: '#ff385c',
      danger: '#dc2626',
      white: '#fff',
      black: '#000',
      light: '#f8f9fa',
      dark: '#333',
      gray: {
        DEFAULT: '#9ca3af',
        light: '#ddd',
        dark: '#717171',
      },
    },
    extend: {
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
  plugins: [],
};
