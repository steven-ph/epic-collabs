const withLess = require('@zeit/next-less');
const { makeTheme } = require('./makeTheme');

const withTheme = [
  nextConfig =>
    withLess({
      ...nextConfig,
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: makeTheme()
      },
      webpack: (config, { isServer }) => {
        if (isServer) {
          const antStyles = /antd\/.*?\/style.*?/;

          const origExternals = [...config.externals];

          config.externals = [
            (context, request, callback) => {
              if (request.match(antStyles)) {
                return callback();
              }

              if (typeof origExternals[0] === 'function') {
                origExternals[0](context, request, callback);
              } else {
                callback();
              }
            },
            ...(typeof origExternals[0] === 'function' ? [] : origExternals)
          ];
        }

        return config;
      }
    })
];

module.exports = { withTheme };
