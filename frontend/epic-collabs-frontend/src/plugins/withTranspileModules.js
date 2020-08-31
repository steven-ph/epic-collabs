const withTranspileModules = require('next-transpile-modules')(['react-spring', '@babel/runtime']);

const withTranspileModulesPlugin = (nextConfig = {}) =>
  withTranspileModules({
    ...nextConfig,
    webpack(config, options) {
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }
      return config;
    }
  });

module.exports = {
  withTranspileModules: withTranspileModulesPlugin
};
