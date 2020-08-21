const mainFont = '"GT Walsheim", sans-serif';
const systemFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const robotoMonoFont =
  '"Roboto Mono", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace';

const typography = {
  mainFont,
  codeFont: robotoMonoFont,
  bodyFont: systemFont,
  headingFont: mainFont
};

module.exports = { typography };
