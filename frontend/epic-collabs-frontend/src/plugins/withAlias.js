const withAlias = (nextConfig = {}) => ({
  ...nextConfig,
  webpack: (config, options) => {
    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(config, options);
    }
    return config;
  }
});

module.exports = {
  withAlias
};
