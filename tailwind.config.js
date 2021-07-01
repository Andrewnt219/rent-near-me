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
    extend: {
      colors: {
        primary: '#ff385c',
        dark: '#222',
        danger: '#dc2626',
        light: '#f8f9fa',
      },

      borderRadius: {
        DEFAULT: '0.5rem',
      },
      borderColor: {
        DEFAULT: '#333',
      },

      textColor: {
        muted: '#717171',
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
