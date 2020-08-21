const { rgba } = require('polished');

const { defaultTheme } = require('../styles');

/**
 * Generate a flat theme object for AntD LESS vars overrides.
 *
 * @param {Object} theme                          Styled-system Theme object
 *
 * @param {string} theme.colors.primary           Primary UI colour
 * @param {string} theme.colors.danger            Danger state colour
 *
 * @param {string} theme.colors.text.base         Default Text colour
 * @param {string} theme.colors.text.inverse      Text colour inverse (on dark)
 *
 * @param {string} theme.colors.background.body   Default body background colour
 * @param {string} theme.colors.background.base   Default background colour
 * @param {string} theme.colors.background.light  Default light background colour
 *
 * @param {string} theme.colors.border.base       Default border color
 *
 * @param {string} theme.fontSizes.rg             Regular font size
 * @param {string} theme.fontSizes.lg             Large font size
 *
 * @param {string} theme.radii.sm                 Small corner radius
 *
 * @param {string} theme.grid.columns             Grid system columns
 *
 * @param {string} theme.breakpoints.xs           Breakpoint for phones
 * @param {string} theme.breakpoints.sm           Breakpoint for tablets
 * @param {string} theme.breakpoints.mg           Breakpoint for desktop
 * @param {string} theme.breakpoints.lg           Breakpoint for wide desktop
 * @param {string} theme.breakpoints.xl           Breakpoint for full HD
 * @param {string} theme.breakpoints.xxl          Breakpoint for large desktop
 */

const getLessVar = str => `@${str.replace(/([a-zA-Z])(?=[A-Z0-9])/g, '$1-').toLowerCase()}`;

const getRgbaColor = val => (/^#/.test(val) ? rgba(val, 1) : val);

const makeTheme = (theme = defaultTheme) =>
  Object.entries(getTheme(theme)).reduce(
    (theme, [key, val]) => ({ ...theme, [getLessVar(key)]: getRgbaColor(val) }),
    {}
  );

const getTheme = ({ breakpoints, grid, colors, fontWeights, radii, other }) => ({
  primaryColor: colors.primary,
  errorColor: colors.danger,
  textColor: colors.text.base,
  textColorInverse: colors.text.inverse,
  bodyBackground: colors.background.body,
  layoutBodyBackground: colors.background.body,
  backgroundColorBase: colors.background.base,
  backgroundColorLight: colors.background.light,
  borderColorBase: colors.border.base,
  skeletonColor: colors.skeleton,
  disabledBg: colors.input.disabled,

  borderRadiusBase: radii.sm,
  btnBorderRadiusBase: radii.sm,

  gridColumns: grid.columns,

  btnFontWeight: fontWeights.button,

  screenXs: breakpoints.xs,
  screenSm: breakpoints.sm,
  screenMd: breakpoints.md,
  screenLg: breakpoints.lg,
  screenXl: breakpoints.xl,
  screenXxl: breakpoints.xxl,

  // // demo of undeclared attribute in interface
  btnShadow: '0',
  labelFontWeight: other.labelFontWeight,
  skeletonBorderRadius: other.skeletonBorderRadius
});

module.exports = { makeTheme };
