const { breakpoints } = require('./breakpoints');
const { colors } = require('./colors');
const { grid } = require('./grid');

const systemFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif';

const defaultTheme = {
  grid, // AntD exclusive
  breakpoints,

  // Non-standard AntD variables that do not exist yet
  other: {
    skeletonBorderRadius: '99px',
    labelFontWeight: 600
  },

  space: {
    s1: '4px',
    s2: '8px',
    s3: '12px',
    s4: '16px',
    s5: '20px',
    s6: '24px',
    s7: '28px',
    s8: '32px',
    s9: '36px',
    s10: '40px',
    s12: '48px',
    s14: '56px',
    s16: '64px',
    s18: '72px',
    s20: '80px'
  },

  colors: {
    primary: colors.blue,

    info: colors.blue,
    infoGrey: colors.darkGrey700,
    danger: colors.red,

    success: colors.green,
    warning: colors.orange,

    skeleton: colors.lightGrey300,

    icon: colors.darkGrey700,

    text: {
      base: colors.greyText,
      light: colors.darkGrey200,
      inverse: colors.white,
      heading: colors.navyDark
    },

    background: {
      base: colors.darkGrey50,
      body: colors.lightGrey300,
      light: colors.lightGrey200,

      info: colors.blue50,
      infoGrey: colors.lightGrey200,
      danger: colors.red50,
      success: colors.green50,
      warning: colors.orange50,

      tooltip: colors.indigo
    },

    border: {
      base: colors.darkGrey50
    },

    input: {
      disabled: colors.lightGrey300
    },

    actionIcon: {
      base: colors.darkGrey400,
      hover: colors.darkGrey700,
      active: colors.darkGrey900
    },

    button: {
      default: {
        background: colors.lightGrey300,
        backgroundHover: colors.lightGrey500,
        border: colors.lightGrey300,
        borderHover: colors.lightGrey300,
        color: colors.greyText,
        colorHover: colors.greyText
      },

      outline: {
        background: 'transparent',
        backgroundHover: colors.lightGrey100,
        border: colors.darkGrey50,
        borderHover: colors.darkGrey300,
        color: colors.greyText,
        colorHover: colors.greyText
      },

      primary: {
        background: colors.blue,
        backgroundHover: colors.blue800,
        border: colors.blue,
        borderHover: colors.blue800,
        color: colors.white,
        colorHover: colors.white
      },

      danger: {
        background: colors.red,
        backgroundHover: colors.red800,
        border: colors.red,
        borderHover: colors.red800,
        color: colors.white,
        colorHover: colors.white
      },

      positive: {
        background: colors.green,
        backgroundHover: colors.green800,
        border: colors.green,
        borderHover: colors.green800,
        color: colors.white,
        colorHover: colors.white
      }
    }
  },

  fonts: {
    brand: `GT Walsheim, ${systemFont}`,
    sans: systemFont
  },

  fontSizes: {
    xs: '12px',
    sm: '14px',
    rg: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '28px',
    '3xl': '36px',
    '4xl': '44px',
    '5xl': '52px',
    '6xl': '60px',
    '7xl': '68px',
    '8xl': '76px',
    '9xl': '84px',
    '10xl': '92px'
  },

  fontWeights: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,

    get button() {
      return this.medium;
    }
  },

  lineHeights: {
    sm: 1.25,
    rg: 1.5,
    lg: 1.75
  },

  shadows: {
    depth1: '0 3px 8px 0 rgba(7, 1, 82, 0.05)',
    depth2: '0 4px 11px 0 rgba(7, 1, 82, 0.07)',
    depth3: '0 7px 15px 0 rgba(7, 1, 82, 0.09)',
    depth4: '0 9px 15px 0 rgba(7, 1, 82, 0.12)'
  },

  radii: {
    sm: '3px',
    lg: '6px'
  },

  iconSizes: {
    sm: '18px',
    rg: '24px',
    lg: '36px'
  },

  styles: {
    root: {
      fontFamily: 'sans',
      fontSize: 'rg',
      fontWeight: 'regular',
      lineHeight: 'rg',
      color: 'text.base'
    },

    h1: {
      fontFamily: 'brand',
      fontWeight: 'bold',
      fontSize: '4xl',
      color: 'text.heading'
    },

    h2: {
      fontFamily: 'brand',
      fontWeight: 'bold',
      fontSize: '3xl',
      color: 'text.heading'
    },

    h3: {
      fontFamily: 'brand',
      fontWeight: 'bold',
      fontSize: '2xl',
      color: 'text.heading'
    },

    h4: {
      fontFamily: 'sans',
      fontWeight: 'semiBold',
      fontSize: 'xl',
      color: 'text.heading'
    }
  }
};

module.exports = { defaultTheme };
