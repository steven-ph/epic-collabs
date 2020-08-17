const withSourceMaps = require('@zeit/next-source-maps')({
  devtool: 'source-map'
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const withSourceMapsPlugin = (nextConfig = {}) =>
  withSourceMaps(
    withBundleAnalyzer({
      ...nextConfig,
      devtool: 'source-map',
      webpack(config, options) {
        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options);
        }
        return config;
      }
    })
  );

module.exports = {
  withSourceMaps: withSourceMapsPlugin
};
