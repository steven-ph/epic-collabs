const { colours } = require('./colours');
const { breakpoints } = require('./breakpoints');
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
    primary: colours.blue,

    info: colours.blue,
    infoGrey: colours.darkGrey700,
    danger: colours.red,

    success: colours.green,
    warning: colours.orange,

    skeleton: colours.lightGrey300,

    icon: colours.darkGrey700,

    text: {
      base: colours.greyText,
      light: colours.darkGrey200,
      inverse: colours.white,
      heading: colours.navyDark
    },

    background: {
      base: colours.darkGrey50,
      body: colours.lightGrey300,
      light: colours.lightGrey200,

      info: colours.blue50,
      infoGrey: colours.lightGrey200,
      danger: colours.red50,
      success: colours.green50,
      warning: colours.orange50,

      tooltip: colours.indigo
    },

    border: {
      base: colours.darkGrey50
    },

    input: {
      disabled: colours.lightGrey300
    },

    actionIcon: {
      base: colours.darkGrey400,
      hover: colours.darkGrey700,
      active: colours.darkGrey900
    },

    button: {
      default: {
        background: colours.lightGrey300,
        backgroundHover: colours.lightGrey500,
        border: colours.lightGrey300,
        borderHover: colours.lightGrey300,
        color: colours.greyText,
        colorHover: colours.greyText
      },

      outline: {
        background: 'transparent',
        backgroundHover: colours.lightGrey100,
        border: colours.darkGrey50,
        borderHover: colours.darkGrey300,
        color: colours.greyText,
        colorHover: colours.greyText
      },

      primary: {
        background: colours.blue,
        backgroundHover: colours.blue800,
        border: colours.blue,
        borderHover: colours.blue800,
        color: colours.white,
        colorHover: colours.white
      },

      danger: {
        background: colours.red,
        backgroundHover: colours.red800,
        border: colours.red,
        borderHover: colours.red800,
        color: colours.white,
        colorHover: colours.white
      },

      positive: {
        background: colours.green,
        backgroundHover: colours.green800,
        border: colours.green,
        borderHover: colours.green800,
        color: colours.white,
        colorHover: colours.white
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
