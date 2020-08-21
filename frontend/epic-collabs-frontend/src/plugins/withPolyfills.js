const withPolyfills = (nextConfig = {}) => ({
  ...nextConfig,
  webpack: (config, options) => {
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js'] && !entries['main.js'].includes('./src/client/polyfills.js')) {
        entries['main.js'].unshift('./src/client/polyfills.js');
      }

      return entries;
    };

    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(config, options);
    }

    return config;
  }
});

module.exports = {
  withPolyfills
};
