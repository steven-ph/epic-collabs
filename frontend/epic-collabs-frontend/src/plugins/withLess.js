const withLess = require('@zeit/next-less');

const withLessPlugin = (nextConfig = {}) =>
  withLess({
    ...nextConfig,
    lessLoaderOptions: {
      javascriptEnabled: true
    },
    webpack: (config, options) => {
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }
      return config;
    }
  });

module.exports = {
  withLess: withLessPlugin
};
