const withCss = require('@zeit/next-css');

const withCssPlugin = (nextConfig = {}) =>
  withCss({
    ...nextConfig,
    webpack: (config, options) => {
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }
      return config;
    }
  });

module.exports = {
  withCss: withCssPlugin
};
