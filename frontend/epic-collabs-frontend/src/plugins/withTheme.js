const withLess = require('@zeit/next-less');
const { makeTheme } = require('./makeTheme');

const withTheme = [
  nextConfig =>
    withLess({
      ...nextConfig,
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: makeTheme()
      }
    })
];

module.exports = { withTheme };
