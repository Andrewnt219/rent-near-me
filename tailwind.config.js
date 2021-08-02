// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme');

const getColorFromCssVariable = (cssVariableName) => ({ opacityVariable }) => {
  const cssVariable = `var(--${cssVariableName})`;

  if (opacityVariable !== undefined) {
    return `rgba(${cssVariable}, var(${opacityVariable}, 1))`;
  }

  return `rgb(${cssVariable})`;
};

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
    fontSize: {
      hero: 'clamp(2.5rem, 2.1rem + 2vw, 4.5rem)', // 40~72px
      h1: 'clamp(2rem, 1.6666666666666667rem + 1.6666666666666667vw, 3rem)', // 32~48px
      h2: 'clamp(1.5rem, 1.1666666666666667rem + 1.6666666666666667vw, 2.5rem)', // 24~40px,
      xl: '1.5rem',
      h3: 'clamp(1.125rem, 0.8333333333333333rem + 1.4583333333333333vw, 2rem)', // 18~32px
      lg: '1.125rem',
      body:
        'clamp(1rem, 0.9583333333333334rem + 0.20833333333333334vw, 1.125rem)', // 16~18px
      sm: '0.875rem',
      xs: '0.75rem',
    },
    colors: {
      transparent: 'transparent',
      current: 'current',
      primary: {
        DEFAULT: getColorFromCssVariable('primary'),
        dark: getColorFromCssVariable('primary-dark'),
      },
      secondary: getColorFromCssVariable('secondary'),
      danger: getColorFromCssVariable('danger'),
      success: getColorFromCssVariable('success'),
      info: getColorFromCssVariable('info'),
      white: '#fff',
      black: '#000',
      light: getColorFromCssVariable('light'),
      dark: getColorFromCssVariable('dark'),
      gray: {
        DEFAULT: getColorFromCssVariable('gray'),
      },
      bordercolor: getColorFromCssVariable('border-color'),
    },
    extend: {
      maxWidth: {
        '8xl': '90rem',
        'var-page': 'var(--page-max-width, 90rem)',
      },

      borderRadius: {
        DEFAULT: '0.25rem',
      },

      borderColor: (theme) => ({
        DEFAULT: theme('colors.bordercolor'),
      }),

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
        '4xl': '5rem',
        'var-app-bar': 'var(--app-bar-height, 4.8125rem)',
        'var-page-px': 'var(--page-px, 1.5rem)',
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
